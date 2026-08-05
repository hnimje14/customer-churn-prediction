import React from 'react';
import { motion } from 'framer-motion';
import { Database, ShieldCheck, Sparkles, Cpu, ArrowRight } from 'lucide-react';
import RiskGauge from '../components/RiskGauge';
import RiskDistributionChart from '../charts/RiskDistributionChart';

const Dashboard = ({
  dashboardData,
  activePrediction,
  recentPredictions: appRecentPredictions,
  onResetOverview,
  onNavigateToPrediction
}) => {
  // Extract dynamic backend dataset calculations
  const totalCustomers = dashboardData?.total_customers ?? 7043;
  const totalFeatures = dashboardData?.total_features ?? 45;
  const churnRate = dashboardData?.churn_rate ?? 26.5;
  const dataQuality = dashboardData?.data_quality ?? 99.8;
  const averageRisk = dashboardData?.average_risk ?? 68.0;
  const selectedModel = dashboardData?.selected_model ?? "XGBoost Classifier";
  
  const customerSegments = dashboardData?.customer_segments || {
    Safe: 1853,
    Low: 2100,
    Medium: 1850,
    High: 1240
  };

  const recentPredictionsList = appRecentPredictions || dashboardData?.recent_predictions || [
    { customer_id: "7590-WBENQ", prediction: "Churn", prediction_result: "Likely to Churn", risk_score: 82, risk_level: "High Risk", probability: "82.4%" },
    { customer_id: "5575-GNVDE", prediction: "No Churn", prediction_result: "Low Churn Risk", risk_score: 18, risk_level: "Safe Customers", probability: "18.1%" },
    { customer_id: "3668-QPYBK", prediction: "Churn", prediction_result: "Likely to Churn", risk_score: 68, risk_level: "Medium Risk", probability: "68.0%" },
    { customer_id: "7795-CFOCW", prediction: "No Churn", prediction_result: "Low Churn Risk", risk_score: 24, risk_level: "Safe Customers", probability: "23.9%" },
    { customer_id: "9237-HQITU", prediction: "Churn", prediction_result: "Likely to Churn", risk_score: 89, risk_level: "High Risk", probability: "88.7%" }
  ];

  const isCustom = Boolean(activePrediction);
  const gaugeScore = isCustom ? activePrediction.risk_score : averageRisk;
  const gaugeLevel = isCustom ? activePrediction.risk_level : "Medium Risk";
  const gaugeSubtitle = isCustom
    ? `Predicted Customer Risk Score (${activePrediction.prediction})`
    : `Based on ${totalCustomers.toLocaleString()} customer records`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 pb-12 max-w-7xl mx-auto"
    >
      {/* TOP HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
            Customer Churn Prediction Dashboard
          </h1>
          <p className="mt-1.5 text-base font-medium text-slate-600">
            AI-based Customer Risk Analysis using Machine Learning
          </p>
        </div>
        
        <button
          onClick={onNavigateToPrediction}
          className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl orange-gradient-bg text-white font-semibold text-sm shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Predict Customer Risk</span>
        </button>
      </div>

      {/* TOP ROW GRID (Dataset Summary | Large Gauge | Customer Segments) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* 1. DATASET SUMMARY CARD (FULLY DYNAMIC FROM BACKEND) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-3 glass-card rounded-3xl p-6 border border-slate-200/80 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                <Database className="w-4 h-4 text-orange-600" />
                Dataset Summary
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                Data Quality: {dataQuality}%
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Customers</span>
                <p className="text-2xl font-extrabold text-slate-900 font-['Outfit'] mt-0.5">
                  {totalCustomers.toLocaleString()}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Features</span>
                <p className="text-xl font-bold text-slate-800 mt-0.5">
                  {totalFeatures} Features
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Overall Churn Rate</span>
                <p className="text-2xl font-extrabold text-orange-600 font-['Outfit'] mt-0.5">
                  {churnRate}%
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Selected Best Model</span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold border border-orange-200/80 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> {selectedModel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 text-xs text-slate-400 font-medium">
            Preprocessed Telco Churn Dataset
          </div>
        </motion.div>

        {/* 2. AVERAGE CUSTOMER CHURN RISK (DYNAMIC GAUGE CENTERPIECE CARD) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute top-4 left-6">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-50 border border-orange-200/60 px-3.5 py-1 rounded-full">
              Average Customer Churn Risk
            </span>
          </div>

          <div className="my-2">
            <RiskGauge
              score={gaugeScore}
              riskLevel={gaugeLevel}
              subtitle={gaugeSubtitle}
              isCustomPrediction={isCustom}
              onReset={onResetOverview}
            />
          </div>
        </motion.div>

        {/* 3. CUSTOMER SEGMENTS CARD (DYNAMIC COUNTS) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-3 glass-card rounded-3xl p-6 border border-slate-200/80 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-base font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                Customer Segments
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600">
                Risk Breakdown
              </span>
            </div>

            <div className="space-y-3">
              {/* 🟢 Safe Customers */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/80 border border-emerald-100">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">🟢</span>
                  <span className="text-xs font-semibold text-slate-700">Safe Customers</span>
                </div>
                <span className="text-sm font-extrabold text-emerald-600 font-['Outfit']">
                  {(customerSegments.Safe ?? customerSegments['Very Low'] ?? 1853).toLocaleString()}
                </span>
              </div>

              {/* 🟡 Low Risk */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/80 border border-amber-100">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">🟡</span>
                  <span className="text-xs font-semibold text-slate-700">Low Risk</span>
                </div>
                <span className="text-sm font-extrabold text-amber-600 font-['Outfit']">
                  {(customerSegments.Low ?? 2100).toLocaleString()}
                </span>
              </div>

              {/* 🟠 Medium Risk */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50/80 border border-orange-100">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">🟠</span>
                  <span className="text-xs font-semibold text-slate-700">Medium Risk</span>
                </div>
                <span className="text-sm font-extrabold text-orange-600 font-['Outfit']">
                  {(customerSegments.Medium ?? 1850).toLocaleString()}
                </span>
              </div>

              {/* 🔴 High Risk */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50/80 border border-rose-100">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">🔴</span>
                  <span className="text-xs font-semibold text-slate-700">High Risk</span>
                </div>
                <span className="text-sm font-extrabold text-rose-600 font-['Outfit']">
                  {(customerSegments.High ?? 1240).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 text-xs text-slate-400 font-medium text-center">
            Full Customer Base Breakdown
          </div>
        </motion.div>
      </div>

      {/* BOTTOM ROW (Card 1: Risk Distribution | Card 2: Recent Predictions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CARD 1: Risk Distribution (Doughnut Chart dynamically generated from segments) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-200/80"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Risk Distribution</h3>
              <p className="text-xs text-slate-500 font-medium">Proportional Customer Risk Segment Breakdown</p>
            </div>
          </div>
          <RiskDistributionChart counts={customerSegments} />
        </motion.div>

        {/* CARD 2: Recent Predictions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-200/80 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Recent Predictions</h3>
                <p className="text-xs text-slate-500 font-medium">Latest 5 Customer Inferences</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-2.5 px-3">Customer ID</th>
                    <th className="py-2.5 px-3">Prediction Result</th>
                    <th className="py-2.5 px-3">Risk Score</th>
                    <th className="py-2.5 px-3">Probability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentPredictionsList.map((row, idx) => {
                    const isChurn = row.prediction === 'Churn';
                    const displayLabel = row.prediction_result || (isChurn ? 'Likely to Churn' : 'Low Churn Risk');
                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{row.customer_id}</td>
                        <td className="py-2.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            isChurn ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {displayLabel}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">
                          {row.risk_score} / 100
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 font-medium">
                          {row.probability}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-right">
            <button
              onClick={onNavigateToPrediction}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:scale-[1.02] inline-flex items-center space-x-1.5 transition-all duration-200"
            >
              <span>Go to Prediction</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Dashboard;
