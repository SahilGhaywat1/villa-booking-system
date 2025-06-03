import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const ChartComponent = ({ bookings }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Revenue',
      data: [65000, 59000, 80000, 81000, 56000, 75000],
      borderColor: '#FFD700',
      tension: 0.4,
    }]
  };

  return (
    <div className="card p-3 mb-4" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid #FFD700' }}>
      <h5 className="text-warning mb-3">Revenue Analytics</h5>
      <Line data={data} />
    </div>
  );
};

export default ChartComponent;