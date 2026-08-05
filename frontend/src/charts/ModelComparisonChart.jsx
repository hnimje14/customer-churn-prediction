import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const ModelComparisonChart = ({ data }) => {
  const defaultData = [
    { model: 'Logistic Reg.', accuracy: 80.2, f1_score: 79.5, roc_auc: 84.1 },
    { model: 'Random Forest', accuracy: 84.5, f1_score: 82.1, roc_auc: 88.3 },
    { model: 'XGBoost', accuracy: 86.8, f1_score: 85.4, roc_auc: 91.2 }
  ];

  const chartData = data && data.length > 0 ? data : defaultData;

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 10, right: 20, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis type="number" domain={[0, 100]} unit="%" stroke="#94a3b8" tick={{ fontSize: 11 }} />
          <YAxis dataKey="model" type="category" stroke="#475569" tick={{ fontSize: 12, fontWeight: 500 }} width={90} />
          <Tooltip
            formatter={(value) => [`${value}%`]}
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '8px', fontSize: '12px' }} />
          <Bar dataKey="accuracy" name="Accuracy" fill="#94a3b8" radius={[0, 4, 4, 0]} barSize={10} />
          <Bar dataKey="f1_score" name="F1 Score" fill="#fb923c" radius={[0, 4, 4, 0]} barSize={10} />
          <Bar dataKey="roc_auc" name="ROC-AUC" fill="#f97316" radius={[0, 4, 4, 0]} barSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModelComparisonChart;
