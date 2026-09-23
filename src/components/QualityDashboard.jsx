import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid
} from "@mui/material";

import { analyzeDataset } from "../api/backend";

const QualityDashboard = ({ datasetId, targetCol, onAnalysisComplete }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await analyzeDataset(datasetId, targetCol);
      setAnalysis(result);
      onAnalysisComplete(result);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.detail || "Analysis failed."
      );
    }
  };

  return (
    <Paper sx={{ p: 4, mb: 4 }}>
  <Typography variant="h6" gutterBottom>
    Dataset Quality Overview
  </Typography>

  <Button
    variant="outlined"
    onClick={handleAnalyze}
    disabled={loading}
    sx={{ mb: 3 }}
  >
    {loading ? "Analyzing..." : "Run Quality Analysis"}
  </Button>

  {analysis && (
    <>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color:
            analysis.quality_score >= 80
              ? "success.main"
              : analysis.quality_score >= 60
              ? "warning.main"
              : "error.main",
          mb: 3
        }}
      >
        {analysis.quality_score}/100
      </Typography>

      <Grid container spacing={2}>
        {Object.entries(analysis.metrics).map(([k, v]) => (
          <Grid item xs={12} sm={6} md={3} key={k}>
            <Paper
              variant="outlined"
              sx={{ p: 2, textAlign: "center" }}
            >
              <Typography variant="caption" color="text.secondary">
                {k.replaceAll("_", " ").toUpperCase()}
              </Typography>
              <Typography variant="h6">{v}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  )}
</Paper>
  );
};

export default QualityDashboard;
