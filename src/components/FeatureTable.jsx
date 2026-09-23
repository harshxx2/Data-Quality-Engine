import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


const FeatureTable = ({ featureDiagnostics }) => {
  if (!featureDiagnostics || featureDiagnostics.length === 0) {
    return (
      <Typography variant="body2">
        No feature diagnostics available.
      </Typography>
    );
  }

  const renderChips = (items, color) =>
    items.map((item, index) => (
      <Chip
        key={index}
        label={item}
        size="small"
        color={color}
        sx={{ mr: 0.5, mb: 0.5 }}
      />
    ));

const getRiskChipConfig = (riskLabel) => {
  const label = Array.isArray(riskLabel) ? riskLabel[0] : riskLabel;

  if (!label) {
    return {
      label: "Safe",
      color: "success",
      icon: <CheckCircleIcon />
    };
  }

  const lower = label.toLowerCase();

  if (lower.includes("leakage")) {
    return {
      label: "Leakage-Prone",
      color: "error",
      icon: <ErrorIcon />
    };
  }

  if (lower.includes("high")) {
    return {
      label: "High Risk",
      color: "warning",
      icon: <WarningAmberIcon />
    };
  }

  if (lower.includes("medium")) {
    return {
      label: "Medium Risk",
      color: "warning",
      icon: <WarningAmberIcon />
    };
  }

  return {
    label: "Safe",
    color: "success",
    icon: <CheckCircleIcon />
  };
};


  return (
    <TableContainer
  component={Paper}
  sx={{
    mb: 4,
    borderRadius: 2,
    overflow: "hidden"
  }}
>
  <Table stickyHeader size="small">
    <TableHead>
      <TableRow>
        {[
          "Feature",
          "Type",
          "Missing %",
          "Quality Flags",
          "Risk",
          "Suggested Action"
        ].map((h) => (
          <TableCell
            key={h}
            sx={{
              fontWeight: 600,
              backgroundColor: "background.paper"
            }}
          >
            {h}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

    <TableBody>
      {featureDiagnostics.map((f) => {
        const riskConfig = getRiskChipConfig(
          f.risk_analysis?.risk_label
        );

        return (
          <TableRow
            hover
            key={f.feature}
            sx={{
              "&:last-child td": { borderBottom: 0 }
            }}
          >
            <TableCell sx={{ fontWeight: 500 }}>
              {f.feature}
            </TableCell>

            <TableCell>{f.dtype}</TableCell>

            <TableCell>{f.missing_percentage}</TableCell>

            <TableCell>
              {(f.quality_flags || []).length > 0 ? (
                f.quality_flags.map((flag, i) => (
                  <Chip
                    key={i}
                    label={flag}
                    size="small"
                    variant="outlined"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))
              ) : (
                <Chip
                  label="None"
                  size="small"
                  color="success"
                  variant="outlined"
                />
              )}
            </TableCell>

            <TableCell>
              <Chip
                icon={riskConfig.icon}
                label={riskConfig.label}
                color={riskConfig.color}
                size="small"
                sx={{
                  fontWeight: 600
                }}
              />
            </TableCell>

            <TableCell>
              {(f.risk_analysis?.suggested_action || ["Retain"]).join(
                ", "
              )}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
</TableContainer>


  );
};

export default FeatureTable;
