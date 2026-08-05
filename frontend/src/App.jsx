import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import ModelAnalysis from './pages/ModelAnalysis';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState(null);
  const [modelAnalysisData, setModelAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Active prediction state (null = dataset average overview)
  const [activePrediction, setActivePrediction] = useState(null);
  const [recentPredictions, setRecentPredictions] = useState([
    { customer_id: "7590-WBENQ", prediction: "Churn", prediction_result: "Likely to Churn", risk_score: 82, risk_level: "High Risk", probability: "82.4%" },
    { customer_id: "5575-GNVDE", prediction: "No Churn", prediction_result: "Low Churn Risk", risk_score: 18, risk_level: "Safe Customers", probability: "18.1%" },
    { customer_id: "3668-QPYBK", prediction: "Churn", prediction_result: "Likely to Churn", risk_score: 68, risk_level: "Medium Risk", probability: "68.0%" },
    { customer_id: "7795-CFOCW", prediction: "No Churn", prediction_result: "Low Churn Risk", risk_score: 24, risk_level: "Safe Customers", probability: "23.9%" },
    { customer_id: "9237-HQITU", prediction: "Churn", prediction_result: "Likely to Churn", risk_score: 89, risk_level: "High Risk", probability: "88.7%" }
  ]);

  // Toast notification message
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const fetchAllData = async () => {
    try {
      const [dashRes, analRes] = await Promise.allSettled([
        axios.get('/api/dashboard'),
        axios.get('/api/model-analysis')
      ]);

      if (dashRes.status === 'fulfilled' && dashRes.value.data?.status === 'success') {
        setDashboardData(dashRes.value.data);
        if (dashRes.value.data.recent_predictions && dashRes.value.data.recent_predictions.length > 0) {
          setRecentPredictions(dashRes.value.data.recent_predictions);
        }
      }
      if (analRes.status === 'fulfilled' && analRes.value.data?.status === 'success') {
        setModelAnalysisData(analRes.value.data);
      }
    } catch (err) {
      console.error('Error loading API endpoints:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleNewPrediction = (predResult, customerId = 'CUST-NEW') => {
    setActivePrediction(predResult);
    
    const newEntry = {
      customer_id: customerId,
      prediction: predResult.prediction,
      prediction_result: predResult.displayResult || (predResult.prediction === 'Churn' ? 'Likely to Churn' : 'Low Churn Risk'),
      risk_score: predResult.risk_score,
      risk_level: predResult.risk_level,
      probability: `${predResult.probability}%`
    };

    setRecentPredictions((prev) => [newEntry, ...prev.slice(0, 4)]);
    showToast("Prediction Completed Successfully");
  };

  const resetToDatasetOverview = () => {
    setActivePrediction(null);
    showToast("Restored to Dataset Overview");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans relative">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center space-x-3 text-sm font-semibold"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            dashboardData={dashboardData}
            activePrediction={activePrediction}
            recentPredictions={recentPredictions}
            onResetOverview={resetToDatasetOverview}
            onNavigateToPrediction={() => setActiveTab('prediction')}
          />
        )}

        {activeTab === 'prediction' && (
          <Prediction
            onPredictionSuccess={handleNewPrediction}
            activePrediction={activePrediction}
          />
        )}

        {activeTab === 'analysis' && (
          <ModelAnalysis
            modelAnalysisData={modelAnalysisData}
          />
        )}
      </main>

      {/* CLEAN MINIMAL FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-800 font-['Outfit'] text-sm">Customer Churn Prediction & Risk Scoring System</span>
              <span className="text-slate-300">•</span>
              <span className="px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 font-bold text-[10px] border border-orange-200/60">
                Student Machine Learning Project
              </span>
            </div>

            <div className="flex items-center space-x-3 text-slate-600">
              <span><strong>Dataset:</strong> IBM Telco Customer Churn</span>
              <span className="text-slate-300">•</span>
              <span><strong>Tech Stack:</strong> React, Flask, XGBoost, SHAP</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
