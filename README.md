# Automated Dataset Quality Scoring & Preprocessing Pipeline (DQE-X)

A **production-grade, ML-ready data preparation system** that evaluates dataset quality, detects data risks, and executes preprocessing steps with full **transparency, reversibility, and version control**.

This project acts as a **pre-model quality gate** before any machine learning training begins.

---

## 🚀 Key Highlights

- Automated Dataset Quality Score (**0–100**)
- Feature-level diagnostics & risk analysis
- Leakage & multicollinearity detection
- Actionable preprocessing recommendations
- One-click execution with live feedback
- Undo & rollback support (dataset versioning)
- Before vs After quality comparison
- Downloadable cleaned datasets
- Auto-generated **PDF & JSON reports**
- Minimal, professional UI (**React + MUI**)

---

## 🧠 Why This Project Matters

Poor data quality is one of the top reasons ML models fail in production.  
**DQE-X ensures:**

- No silent data leakage
- No destructive preprocessing without user consent
- Full auditability of every transformation
- Quantified improvement in dataset quality

This mirrors how **enterprise ML pipelines** handle data validation and preprocessing.

---

## 🏗️ System Architecture

```bash 
Frontend (React + MUI)
↓ REST API
Backend (FastAPI)
├── Quality Scoring Engine
├── Risk & Leakage Detection
├── Recommendation Engine
├── Execution Engine
├── Versioning & Rollback
└── Report Generator
```

## 🔄 End-to-End Workflow

1. Upload CSV Dataset  
2. Optional Target Column Selection  
3. Schema & Type Validation  
4. Quality Evaluation  
5. Risk & Leakage Detection  
6. Dataset Quality Score (0–100)  
7. Actionable Recommendations  
8. Execution Mode (Optional)  
9. Undo / Rollback (Any Time)  
10. Re-scoring After Preprocessing  
11. Final Report & Downloads  

---

## 🧪 Dataset Quality Metrics

The quality score is computed using **weighted metrics**:

- Missing Value Ratio
- Duplicate Records
- Low Variance Features
- Skewness
- Class Imbalance
- Multicollinearity (VIF)
- Target Leakage Risk

Each feature is labeled as:

- ✅ **Safe**
- ⚠️ **Needs Cleaning**
- 🔴 **High Risk**
- 🚨 **Leakage-Prone**

---

## ⚙️ Supported Preprocessing Actions

| Category | Techniques |
|--------|-----------|
| Missing Values | Mean, Median, Mode |
| Skewness | Log Transform |
| Scaling | StandardScaler |
| Leakage | Feature Removal |
| Redundancy | Feature Dropping |
| Multicollinearity | Drop or Transform (User Choice) |

⚠️ **Destructive actions always require explicit user confirmation.**

---

## 📄 Reports & Artifacts

After execution, the system generates:

- 📄 **PDF Report** (Human-readable)
- 📦 **JSON Report** (Pipeline integration)
- 📊 Execution Log
- 🗂️ Versioned CSV Datasets

---

## 🖥️ Frontend Tech Stack

- React
- Material UI (MUI)
- Axios
- Modular Component Architecture

---

## 🔧 Backend Tech Stack

- Python
- FastAPI
- Pandas / NumPy
- ReportLab (PDF generation)
- Pydantic
- RESTful API design

---

## ▶️ Running Locally

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
Swagger UI: http://127.0.0.1:8000/docs
```

### Frontend

```bash
Frontend
cd frontend
npm install
npm start
```

## 🧩 Design Principles

- Transparency over automation  
- Reversibility by default  
- No silent data loss  
- Human-in-the-loop preprocessing  
- Production-ready API contracts  

---

## 🌱 Future Enhancements

- Batch execution of safe actions  
- Dataset diff visualization  
- ML-model readiness scoring  
- Cloud deployment (Docker + AWS/GCP)  
- Support for Parquet & Excel  

---

## 👤 Author

**Saakshi Pandey**  
Machine Learning & Data Engineering Enthusiast  

- 🔗 GitHub: https://github.com/SaakshiPandey  
- 🔗 LinkedIn: https://linkedin.com/in/saakshi-pandey  

---

## ⭐ If you find this useful

Star the repository ⭐  
Feedback and contributions are welcome!
