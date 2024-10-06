import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const WeatherChart = ({ weatherData }) => {
    // Prepare data for the chart
    const chartData = {
        labels: weatherData.map(data => data.date), // Assuming your data has a date field
        datasets: [
            {
                label: 'Temperature', // Change the label based on your data
                data: weatherData.map(data => data.temperature), // Assuming your data has a temperature field
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4, // Add tension for smooth curves
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date', // X-axis label
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)', // Y-axis label
                },
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
    };

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h2>Weather Chart</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default WeatherChart;
