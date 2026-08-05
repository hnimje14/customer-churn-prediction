# Changelog

All notable changes to the **Customer Churn Prediction & Risk Scoring System** project will be documented in this file.

## [1.0.0] - 2026-08-05

### Added
- **Dynamic Dataset Pipeline**: Automated preprocessing, missing value imputation, and feature engineering for the IBM Telco Customer Churn dataset ($7,043$ rows, $45$ features).
- **SMOTE Class Balancing**: Synthetic Minority Over-sampling Technique balancing minority churn class samples ($8,278$ post-SMOTE training samples).
- **Multi-Algorithm Benchmark**: Training and benchmark evaluation for Logistic Regression, Random Forest, and **XGBoost Classifier** ($\text{Accuracy}=86.8\%$, $\text{F1}=85.4\%$, $\text{ROC-AUC}=91.2\%$).
- **SHAP Explainability**: TreeExplainer integration producing feature ranking scores and human-readable natural language prediction explanations.
- **REST API Endpoints**: Flask REST API providing `GET /dashboard`, `GET /model-analysis`, `POST /predict`, `GET /feature-importance`, and `GET /metrics`.
- **Hero Risk Gauge**: Semicircular animated canvas dial with Framer Motion needle physics, glossy highlights, drop shadows, and zero label overlap architecture.
- **Animated Risk Meter**: Horizontal animated probability gauge for individual customer inference.
- **Download PDF Prediction Report**: Client-side `jsPDF` printable 1-page report generator with timestamp and full metric breakdown.
- **Docker & Compose**: Dockerization of frontend (Node 20) and backend (Python 3.11 slim) with `docker-compose.yml` single-command startup.
- **Portfolio & Open Source Setup**: Comprehensive `README.md` with Mermaid pipeline diagram, `LICENSE` (MIT), `CONTRIBUTING.md`, `.env.example`, and deployment configuration for Vercel, Netlify, Render, and Railway.
