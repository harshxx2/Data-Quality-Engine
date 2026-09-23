import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from "@mui/material";

import { uploadDataset } from "../api/backend";

const UploadPanel = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [targetCol, setTargetCol] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file.");
      return;
    }

    try {
      setLoading(true);
      const response = await uploadDataset(file);

      onUploadSuccess({
        datasetId: response.dataset.dataset_id,
        targetCol: targetCol || null,
        metadata: response.dataset
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.detail || "Upload failed. Please try again."
      );
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 4, mb: 4, border: "1px solid #E5E7EB" }}>
  <Typography variant="h6" gutterBottom>
    Upload Dataset
  </Typography>

  <Box
    sx={{
      border: "2px dashed",
      borderColor: "primary.main",
      borderRadius: 2,
      p: 3,
      textAlign: "center",
      mb: 2
    }}
  >
    <Typography variant="body2" color="text.secondary">
      Upload a CSV file to initialize the pipeline
    </Typography>
    <Button component="label" sx={{ mt: 1 }}>
      Select File
      <input hidden type="file" accept=".csv" onChange={handleFileChange} />
    </Button>
    {file && (
      <Typography variant="caption" display="block">
        {file.name}
      </Typography>
    )}
  </Box>

  <TextField
    label="Target Column (optional)"
    fullWidth
    size="small"
    value={targetCol}
    onChange={(e) => setTargetCol(e.target.value)}
    sx={{ mb: 2 }}
  />

  {error && <Typography color="error">{error}</Typography>}

  <Button
    fullWidth
    variant="contained"
    size="large"
    disabled={loading}
    onClick={handleUpload}
  >
    {loading ? "Uploading..." : "Initialize Pipeline"}
  </Button>
</Paper>
);
};

export default UploadPanel;
