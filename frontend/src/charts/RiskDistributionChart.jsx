import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const RiskDistributionChart = ({ counts }) => {
  const defaultCounts = {
    'High': 1240,
    'Medium': 1850,
    'Low': 2100,
    'Very Low': 1853
  };

  const c = counts || defaultCounts;

  const data = [
    { name: 'High Risk', value: c['High'] || c['High Risk'] || 1240, color: '#ef4444' },
    { name: 'Medium Risk', value: c['Medium'] || c['Medium Risk'] || 1850, color: '#f97316' },
    { name: 'Low Risk', value: c['Low'] || c['Low Risk'] || 2100, color: '#eab308' },
    { name: 'Very Low Risk', value: c['Very Low'] || c['Safe'] || 1853, color: '#22c55e' },
  ];

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={45}
            outerRadius={75}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [value.toLocaleString(), 'Customers']}
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskDistributionChart;
