import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

const FeatureImportanceChart = ({ features }) => {
  const defaultFeatures = [
    { feature: 'Contract_Month-to-month', score: 100 },
    { feature: 'Tenure Months', score: 86.4 },
    { feature: 'InternetService_Fiber optic', score: 72.1 },
    { feature: 'Monthly Charges', score: 65.8 },
    { feature: 'PaymentMethod_Electronic check', score: 58.2 },
    { feature: 'TechSupport_No', score: 49.3 },
    { feature: 'OnlineSecurity_No', score: 42.7 },
    { feature: 'Average Monthly Spend', score: 38.9 }
  ];

  const rawData = features && features.length > 0 ? features.slice(0, 8) : defaultFeatures;

  const chartData = rawData.map(item => ({
    name: item.feature.replace(/_/g, ' ').replace('Flag', '').trim(),
    score: item.score || Math.round(item.importance * 100)
  })).reverse();

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis
            dataKey="name"
            type="category"
            stroke="#475569"
            tick={{ fontSize: 11, fontWeight: 500 }}
            width={160}
          />
          <Tooltip
            formatter={(value) => [`${value} idx`, 'SHAP Score']}
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          />
          <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={14}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`rgba(249, 115, 22, ${0.45 + (index / chartData.length) * 0.55})`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportanceChart;
