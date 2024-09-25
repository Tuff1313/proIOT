import React from 'react';
import { Line } from 'react-chartjs-2';

const FluidLevelChart = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.timestamp), // Assume each entry has a timestamp
    datasets: [
      {
        label: 'Fluid Level',
        data: data.map(entry => entry.level),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default FluidLevelChart;
