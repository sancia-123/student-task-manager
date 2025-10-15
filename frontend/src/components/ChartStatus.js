// src/components/ChartStatus.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartStatus = ({ tasks = [] }) => {
  // Count tasks by status
  const completed = tasks.filter(task => task.status === 'Completed').length;
  const pending = tasks.filter(task => task.status === 'Pending').length;
  const inProgress = tasks.filter(task => task.status === 'In Progress').length;

  const data = {
    labels: ['Completed', 'Pending', 'In Progress'],
    datasets: [
      {
        data: [completed, pending, inProgress],
        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'], // Green, Orange, Blue
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allow custom sizing
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#000', // legend text color
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed} task${context.parsed !== 1 ? 's' : ''}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: 300, height: 300, margin: '0 auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ChartStatus;
