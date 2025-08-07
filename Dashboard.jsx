import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import api from '../utils/api';
const Dashboard = () => {
  const [summary, setSummary] = useState({ income: 0, expenses: 0, savings: 0 });
  useEffect(() => {
    api.get('/reports/monthly-summary').then(res => setSummary(res.data)).catch(console.error);
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <Pie
        data={{
          labels: ['Income', 'Expenses', 'Savings'],
          datasets: [{
            data: [summary.income, summary.expenses, summary.savings],
            backgroundColor: ['#22c55e', '#ef4444', '#2563eb']
          }]
        }}
      />
    </div>
  );
};
export default Dashboard;