import React, { useState } from "react";
import { Container, Typography, Chip,Box, Stack } from "@mui/material";

import UploadPanel from "../components/UploadPanel";
import QualityDashboard from "../components/QualityDashboard";
import FeatureTable from "../components/FeatureTable";
import ExecutionPanel from "../components/ExecutionPanel";
import DownloadPanel from "../components/DownloadPanel";

const Home = () => {
  const [datasetId, setDatasetId] = useState(null);
  const [targetCol, setTargetCol] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleUploadSuccess = ({ datasetId, targetCol }) => {
    setDatasetId(datasetId);
    setTargetCol(targetCol);
    setAnalysis(null);
  };

  const handleAnalysisComplete = (result) => {
  const executedActions = new Set(
    (result.execution_log || []).map(e => e.description)
  );

  result.recommendations = result.recommendations.filter(
    rec => !executedActions.has(
      `${rec.recommended_action} on ${rec.target}`
    )
  );

  setAnalysis(result);
};

const [refreshKey, setRefreshKey] = useState(0);


  return (
  <Box
  sx={{
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 60%)",
    px: { xs: 2, sm: 4, md: 6 },
    py: 6
  }}
>
  {/* HEADER */}
  <Box
    sx={{
      maxWidth: 1400,
      mx: "auto",
      mb: 6
    }}
  >
    <Typography
    variant="h3"
    sx={{
        fontWeight: 800,
        letterSpacing: "-1px",
        color: "primary.main"
    }}
    >
    Data Quality Engine
    </Typography>



    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ maxWidth: 720, mt: 1 }}
    >
      Automated dataset diagnostics, leakage detection, and
      production-ready preprocessing execution for machine learning
      pipelines.
    </Typography>

    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
      <Chip label="Automated Analysis" color="primary" variant="outlined" />
      <Chip label="Leakage Detection" color="error" variant="outlined" />
      <Chip label="ML-Ready Data" color="success" variant="outlined" />
    </Stack>
  </Box>

  {/* CONTENT AREA */}
  <Box
    sx={{
      maxWidth: 1400,
      mx: "auto"
    }}
  >
    <UploadPanel onUploadSuccess={handleUploadSuccess} />

    {datasetId && (
      <QualityDashboard
        datasetId={datasetId}
        targetCol={targetCol}
        onAnalysisComplete={handleAnalysisComplete}
      />
    )}

    {analysis && (
      <>
        <FeatureTable featureDiagnostics={analysis.feature_diagnostics} />
        <ExecutionPanel
          datasetId={datasetId}
          recommendations={analysis.recommendations}
          onExecutionSuccess={() => setRefreshKey((k) => k + 1)}
        />
        <DownloadPanel datasetId={datasetId} refreshKey={refreshKey} />
      </>
    )}
  </Box>
</Box>


  );
};

export default Home;
