import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, "");

if (!API_BASE_URL) {
  throw new Error(
    "REACT_APP_API_BASE_URL is not defined. Check your environment variables."
  );
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

/* ================================
   DATASET UPLOAD
================================ */
export const uploadDataset = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};

/* ================================
   ANALYSIS & SCORING
================================ */
export const analyzeDataset = async (datasetId, targetCol = null) => {
  const params = targetCol ? { target_col: targetCol } : {};
  const response = await api.get(`/analyze/${datasetId}`, { params });
  return response.data;
};

/* ================================
   EXECUTION MODE
================================ */
export const executeStep = async (datasetId, action, params) => {
  const response = await api.post(`/execute/${datasetId}`, {
    action,
    params
  });
  return response.data;
};

/* ================================
   VERSIONING & UNDO
================================ */
export const getVersions = async (datasetId) => {
  const response = await api.get(`/versions/${datasetId}`);
  return response.data;
};

export const rollbackDataset = (datasetId, version) =>
  axios.post(`${API_BASE_URL}/versions/rollback/${datasetId}`, {
    version: version
  });


/* ================================
   POST-EXECUTION SCORING
================================ */
export const rescoreDataset = async (datasetId, targetCol = null) => {
  const params = targetCol ? { target_col: targetCol } : {};
  const response = await api.get(`/rescore/${datasetId}`, { params });
  return response.data;
};

/* ================================
   REPORTS
================================ */
export const generateReport = async (datasetId, targetCol = null) => {
  const params = targetCol ? { target_col: targetCol } : {};
  const response = await api.post(`/report/${datasetId}`, null, { params });
  return response.data;
};

export const downloadReportPDF = (datasetId) => {
  window.open(`${API_BASE_URL}/report/${datasetId}/pdf`, "_blank");
};

export const downloadReportJSON = (datasetId) => {
  window.open(`${API_BASE_URL}/report/${datasetId}/json`, "_blank");
};

export const undoLastExecution = (datasetId) =>
  axios.post(`${API_BASE_URL}/versions/undo/${datasetId}`);

/* ================================
   DATASET DOWNLOAD
================================ */
export const downloadDatasetCSV = (datasetId, version) => {
  const url = version
    ? `${API_BASE_URL}/download/${datasetId}?version=${version}`
    : `${API_BASE_URL}/download/${datasetId}`;
  window.open(url, "_blank");
};

