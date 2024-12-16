import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

const PriceStats = ({ data, selectedMonth }) => {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    if (data && selectedMonth) {
      // Extract labels (ranges) and values from the data object
      const labels = Object.keys(data); // ["0-100", "101-200", "201-300", ...]
      const values = Object.values(data); // [2, 0, 0, ...]

      // Ensure the background and border colors match the number of bars
      const backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ];

      const borderColor = [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ];

      // Prepare chart data dynamically
      const chartData = {
        labels: labels, // Ranges as labels
        datasets: [
          {
            label: labels, // Label for the dataset
            data: values, // Values for each range
            backgroundColor: backgroundColor.slice(0, values.length), // Slice colors based on values length
            borderColor: borderColor.slice(0, values.length), // Same for borderColor
            borderWidth: 1,
          },
        ],
      };

      // Chart options with plugins like tooltips and datalabels
      const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`, // Customizing tooltip
            },
          },
          datalabels: {
            color: '#fff', // Color of the labels
            font: {
              weight: 'bold',
              size: 12,
            },
            formatter: (value) => `${value}`, // Show the value on the bar
            padding: 5,
          },
        },
        scales: {
          x: {
            beginAtZero: true, // Start the X-axis at 0
          },
          y: {
            beginAtZero: true, // Start the Y-axis at 0
            max: 5,
            
          },
        },
      };

      // Update chart data and options in the state
      setChartData(chartData);
      setChartOptions(chartOptions);
    }
  }, [data, selectedMonth]); // Run when data or selectedMonth changes

  if (!chartData || !chartOptions) {
    return <div>Loading...</div>; // Show loading state until chart data is ready
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='text-center text-3xl font-bold'>Category Stats</h1>
      <div className="flex">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PriceStats;
