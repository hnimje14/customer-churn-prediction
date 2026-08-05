import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, GitBranch, Layers, CheckCircle2, UserCheck, Sparkles, Database } from 'lucide-react';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8 pb-12"
    >
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
          About Customer Churn Risk AI
        </h1>
        <p className="mt-1 text-sm font-medium text-slate-600">
          End-to-end Machine Learning web application designed for placement interviews and portfolio showcase.
        </p>
      </div>

      {/* DEVELOPER BANNER */}
      <div className="glass-card rounded-3xl p-6 border border-orange-200 bg-gradient-to-r from-orange-50/80 via-white to-amber-50/60 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl orange-gradient-bg text-white flex items-center justify-center shadow-md shadow-orange-500/20">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Developer Attribution</span>
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Student Machine Learning Project
            </h2>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-700">
          Computer Engineering
        </span>
      </div>

      {/* PROJECT OVERVIEW & PROBLEM STATEMENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-3xl p-6 border border-slate-200 space-y-3">
          <h3 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-600" />
            Project Overview
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            This project provides an automated, explainable Machine Learning pipeline for telecommunications customer retention. It automatically ingests raw customer data, handles missing values, engineers domain-specific features, addresses severe class imbalance using SMOTE, and deploys high-performing classification models.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-slate-200 space-y-3">
          <h3 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-600" />
            Problem Statement
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Customer acquisition costs in telecom are 5× to 25× higher than customer retention. By identifying churn risk early with calibrated probability scores (0–100) and SHAP explainability insights, businesses can proactively offer targeted retention incentives.
          </p>
        </div>
      </div>

      {/* DATASET INFORMATION */}
      <div className="glass-card rounded-3xl p-6 border border-slate-200 space-y-3">
        <h3 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
          <Database className="w-4 h-4 text-orange-600" />
          Dataset Information
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          Built using the standard IBM Telco Customer Churn dataset (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-orange-600 font-mono text-xs">Telco_customer_churn.xlsx</code>) containing 7,043 customer accounts, 33 raw attributes, demographic details, subscribed services, account tenure, contract terms, billing preferences, and churn labels.
        </p>
      </div>

      {/* TECH STACK */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2 border-b border-slate-100 pb-3">
          <Code className="w-4 h-4 text-orange-600" />
          Technology Stack
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2.5">Frontend Architecture</h4>
            <div className="flex flex-wrap gap-2">
              {['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Axios'].map((tech, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/60">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2.5">Backend & Machine Learning</h4>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Flask', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'SMOTE', 'SHAP', 'Joblib'].map((tech, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl bg-orange-50 text-orange-700 text-xs font-semibold border border-orange-200/60">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MACHINE LEARNING PIPELINE & FUTURE IMPROVEMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-3xl p-6 border border-slate-200 space-y-3">
          <h3 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-orange-600" />
            Machine Learning Pipeline
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 font-medium">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Automated cleaning & drop of ID/leakage columns</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Engineered 8 features (Tenure Group, Risk Flags, Spend)</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Synthetic Minority Over-sampling (SMOTE)</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Multi-model benchmark (LR, RF, XGBoost)</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> SHAP TreeExplainer for feature importance</li>
          </ul>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-slate-200 space-y-3">
          <h3 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-orange-600" />
            Future Improvements
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 font-medium">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> Hyperparameter tuning via Optuna / GridSearchCV</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> Real-time batch dataset file upload support</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> Automated email alerts for high-risk accounts</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> Integration with LIME for dual explainability</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
