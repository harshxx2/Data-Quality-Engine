import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import {
  executeStep,
  undoLastExecution
} from "../api/backend";

/* ------------------ Helpers ------------------ */

const requiresUserChoice = (rec) => {
  const text = rec.recommended_action.toLowerCase();

  // Explicit safe actions → no choice needed
  if (
    text.includes("median") ||
    text.includes("mean") ||
    text.includes("mode") ||
    text.includes("impute") ||
    text.includes("scale") ||
    text.includes("normalize")
  ) {
    return false;
  }

  // Everything else is potentially destructive → ask user
  return true;
};

const mapRecommendationToAction = (rec, overrideAction = null) => {
  if (overrideAction) {
    return { action: overrideAction, params: { feature: rec.target } };
  }

  const text = rec.recommended_action.toLowerCase();

  if (text.includes("median"))
    return { action: "median_impute", params: { feature: rec.target } };
  if (text.includes("mean"))
    return { action: "mean_impute", params: { feature: rec.target } };
  if (text.includes("mode"))
    return { action: "mode_impute", params: { feature: rec.target } };
  if (text.includes("log"))
    return { action: "log_transform", params: { feature: rec.target } };
  if (text.includes("scale") || text.includes("normalize"))
    return { action: "standard_scale", params: { feature: rec.target } };

  return { action: "drop_feature", params: { feature: rec.target } };
};

/* ------------------ Component ------------------ */

const ExecutionPanel = ({ datasetId, recommendations, onExecutionSuccess }) => {
  const [pendingRecs, setPendingRecs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  /* Choice modal */
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [selectedRec, setSelectedRec] = useState(null);

  /* ------------------ Effects ------------------ */

  useEffect(() => {
    setPendingRecs(recommendations || []);
  }, [recommendations]);

  /* ------------------ Execution ------------------ */

  const executeAction = async (rec, overrideAction = null) => {
    const mapped = mapRecommendationToAction(rec, overrideAction);
    setLoading(true);

    try {
      const res = await executeStep(datasetId, mapped.action, mapped.params);

      setPendingRecs((prev) =>
        prev.filter(
          (r) =>
            !(
              r.target === rec.target &&
              r.recommended_action === rec.recommended_action
            )
        )
      );

      setSnackbar({
        open: true,
        message: res.execution.description,
        severity: "success"
      });

      onExecutionSuccess();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.detail || "Execution failed",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteClick = (rec) => {
    if (requiresUserChoice(rec)) {
      setSelectedRec(rec);
      setChoiceOpen(true);
    } else {
      executeAction(rec);
    }
  };

  /* ------------------ Undo ------------------ */

  const handleUndo = async () => {
    try {
      const res = await undoLastExecution(datasetId);
      setSnackbar({
        open: true,
        message: res.data.message,
        severity: "info"
      });
      onExecutionSuccess();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.detail || "Undo failed",
        severity: "error"
      });
    }
  };

  /* ------------------ Render ------------------ */

  return (
    <Paper sx={{ p: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Execution Pipeline
      </Typography>

      <Button
        variant="outlined"
        color="warning"
        onClick={handleUndo}
        sx={{ mb: 2 }}
      >
        Undo Last Action
      </Button>

      {pendingRecs.length === 0 ? (
        <Typography color="success.main">
          Pipeline is fully optimized.
        </Typography>
      ) : (
        <List>
          {pendingRecs.map((rec, idx) => (
            <ListItem
              key={idx}
              divider
              secondaryAction={
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleExecuteClick(rec)}
                  disabled={loading}
                >
                  Execute
                </Button>
              }
            >
              <ListItemText
                primary={
                  <Stack direction="row" spacing={1}>
                    <Typography fontWeight={500}>
                      {rec.target}
                    </Typography>
                    <Chip
                      label={rec.impact}
                      size="small"
                      color={
                        rec.impact === "High"
                          ? "error"
                          : rec.impact === "Medium"
                          ? "warning"
                          : "success"
                      }
                    />
                  </Stack>
                }
                secondary={rec.recommended_action}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* -------- DROP / TRANSFORM CHOICE MODAL (RESTORED) -------- */}
      <Dialog open={choiceOpen} onClose={() => setChoiceOpen(false)}>
        <DialogTitle>Choose Execution Action</DialogTitle>
        <DialogContent>
          <Typography>
            The recommendation for <b>{selectedRec?.target}</b> is ambiguous.
            Choose how to proceed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setChoiceOpen(false);
              executeAction(selectedRec, "drop_feature");
            }}
          >
            Drop Feature
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setChoiceOpen(false);
              executeAction(selectedRec, "log_transform");
            }}
          >
            Transform Feature
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ExecutionPanel;
