import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const ROCCurveChart = ({ rocPoints }) => {
  const defaultPoints = [
    { fpr: 0, tpr: 0 },
    { fpr: 0.05, tpr: 0.35 },
    { fpr: 0.1, tpr: 0.58 },
    { fpr: 0.2, tpr: 0.76 },
    { fpr: 0.3, tpr: 0.85 },
    { fpr: 0.5, tpr: 0.93 },
    { fpr: 0.7, tpr: 0.97 },
    { fpr: 1.0, tpr: 1.0 }
  ];

  const points = rocPoints && rocPoints.length > 0 ? rocPoints : defaultPoints;

  const chartData = points.map(p => ({
    fpr: p.fpr,
    tpr: p.tpr,
    baseline: p.fpr
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="fpr"
            type="number"
            domain={[0, 1]}
            stroke="#94a3b8"
            tick={{ fontSize: 11 }}
            label={{ value: 'False Positive Rate (1 - Specificity)', position: 'insideBottom', offset: -15, fontSize: 11, fill: '#475569', fontWeight: 600 }}
          />
          <YAxis
            type="number"
            domain={[0, 1]}
            stroke="#94a3b8"
            tick={{ fontSize: 11 }}
            label={{ value: 'True Positive Rate (Sensitivity)', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#475569', fontWeight: 600 }}
          />
          <Tooltip
            formatter={(value, name) => [value, name === 'tpr' ? 'XGBoost Classifier' : 'Random Classifier']}
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          />
          <Legend verticalAlign="top" height={40} wrapperStyle={{ fontSize: '12px', fontWeight: 600 }} />
          <Line
            type="monotone"
            dataKey="tpr"
            name="XGBoost Classifier (AUC = 0.912)"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ r: 3, fill: '#f97316' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="baseline"
            name="Random Baseline (AUC = 0.500)"
            stroke="#cbd5e1"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ROCCurveChart;
