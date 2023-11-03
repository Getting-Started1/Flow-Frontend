import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import moment from 'moment';

function DashChartComponent() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Flow Rate (L/min)',
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                yAxisID: 'y',
                tension: 0.4,
                data: [],
            },
        ],
    });

    useEffect(() => {
        let dataPoints = [];

        const interval = setInterval(() => {
            // Simulate receiving data from WebSocket (replace with actual WebSocket logic)
            const newDataPoint = {
                x: new Date(),
                y: Math.random() * 10, // Replace with your actual data
            };

            dataPoints = [...dataPoints, newDataPoint];

            if (dataPoints.length > 10) {
                dataPoints.shift(); // Limit the number of data points
            }

            const labels = dataPoints.map((point) =>
                moment(point.x).format('HH:mm:ss')
            );
            const flowRates = dataPoints.map((point) => point.y);

            setChartData((prevChartData) => ({
                ...prevChartData,
                labels: labels,
                datasets: [
                    {
                        ...prevChartData.datasets[0],
                        data: flowRates,
                    },
                ],
            }));
        }, 5000); // Update the chart every 5 seconds (adjust as needed)

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <React.Fragment>
            <div className="card">
                <Chart type="line" data={chartData} />
            </div>
        </React.Fragment>
    );
}

export default DashChartComponent;
