import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Typography,
  Select,
  MenuItem,
  Divider,
  Stack
} from "@mui/material";

import {
  getVersions,
  downloadDatasetCSV,
  generateReport,
  downloadReportPDF,
  downloadReportJSON
} from "../api/backend";

const DownloadPanel = ({ datasetId, refreshKey }) => {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState("");
  const [reportGenerated, setReportGenerated] = useState(false);

  useEffect(() => {
    if (datasetId) fetchVersions();
  }, [datasetId, refreshKey]);

  const fetchVersions = async () => {
    const res = await getVersions(datasetId);
    setVersions(res.versions || []);
    setSelectedVersion(res.latest || "");
  };

  const handleGenerateReport = async () => {
    await generateReport(datasetId);
    setReportGenerated(true);
  };

  return (
    <Paper sx={{ p: 4 }}>
  <Typography variant="h6" gutterBottom>
    Export & Reports
  </Typography>

  <Select
    fullWidth
    size="small"
    value={selectedVersion}
    onChange={(e) => setSelectedVersion(e.target.value)}
    sx={{ mb: 2 }}
  >
    {versions.map((v) => (
      <MenuItem key={v} value={v}>
        Version {v}
      </MenuItem>
    ))}
  </Select>

  <Stack spacing={2}>
    <Button
      variant="contained"
      onClick={() => downloadDatasetCSV(datasetId, selectedVersion)}
    >
      Download CSV
    </Button>

    <Divider />

    <Button variant="outlined" onClick={handleGenerateReport}>
      Generate Quality Report
    </Button>

    <Stack direction="row" spacing={2}>
      <Button
        disabled={!reportGenerated}
        onClick={() => downloadReportPDF(datasetId)}
      >
        PDF
      </Button>
      <Button
        disabled={!reportGenerated}
        onClick={() => downloadReportJSON(datasetId)}
      >
        JSON
      </Button>
    </Stack>
  </Stack>
</Paper>
  );
};

export default DownloadPanel;
