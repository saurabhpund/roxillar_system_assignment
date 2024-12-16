import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; 

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, ChartDataLabels);

const CategoryStats = ({ data, selectedMonth }) => {
  const [options, setOptions] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data) {

      // Create chartData object based on your data
      const chartData = {
        labels: data.data && Array.from(Object.keys(data.data)), // Replace with dynamic data if needed
        datasets: [
          {
            data: data.data && Array.from(Object.values(data.data)), // Replace with dynamic data if needed
            backgroundColor: ['#FF5733', '#33B5FF', '#FFEB33', '#00BD9D'],
            borderColor: ['#FF5733', '#33B5FF', '#FFEB33', '#00BD9D'],
            borderWidth: 1,
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`, // Customizing tooltip display
            },
          },
          // Configuring datalabels to display percentages
          datalabels: {
            color: '#fff', // Text color of the labels
            formatter: (value, context) => {
              const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
              const percentage = ((value / total) * 100).toFixed(2); // Calculate percentage
              return `${percentage}%`; // Display percentage
            },
            font: {
              weight: 'bold',
              size: 14,
            },
            padding: 5,
          },
        },
      };

      // Set the state with new chart data and options
      setChartData(chartData);
      setOptions(options);
    }
  }, [data, selectedMonth]);

  // Ensure the chartData and options are both set before rendering the Pie chart
  if (!chartData || !options) {
    return <div>Loading...</div>; // Show loading until chartData and options are set
  }

  return (
    <div className='flex w-ful justify-between items-center px-5 flex-wrap'>
      <h2 className='text-5xl font-bold w-1/2'>Monthly Sales Breakdown</h2>
      <div className="w-1/2 flex items-center">
      <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CategoryStats;
