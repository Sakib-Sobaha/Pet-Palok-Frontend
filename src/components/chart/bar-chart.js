import React, { useEffect } from "react";
import Chart from "chart.js/auto"; // Import Chart.js library

const BarChart = ({ data }) => {
  useEffect(() => {
    const ctx = document.getElementById("barChart");
    if (ctx) {
      const maxSales = Math.max(...data.map((item) => item.sales)); // Calculate the maximum sales value

      const config = {
        type: "bar",
        data: {
          labels: data.map((item) => item.name), // Extract item names as labels
          datasets: [
            {
              label: "Sales",
              backgroundColor: data.map((item) => {
                const percentage = (item.sales / maxSales) * 100; // Calculate the percentage
                if (percentage >= 70) {
                  return "rgba(20, 140, 100, 0.7)"; // Green
                } else if (percentage < 40) {
                  return "rgba(255, 0, 0, 0.7)"; // Red
                } else {
                  return "rgba(230, 130, 0, 0.7)"; // Orange
                }
              }),
              data: data.map((item) => item.sales), // Extract sales amounts as data
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: maxSales * 1.1,
            },
          },
        },
      };

      const chartInstance = new Chart(ctx, config);

      // Clean up function
      return () => {
        chartInstance.destroy(); // Destroy chart instance on cleanup
      };
    }
  }, [data]);

  return (
    <div className="card p-2 shadow-xl">
      <div className="card-title">Sales Data</div>
      <canvas id="barChart" width="400" height="200"></canvas>
    </div>
  );
};

export default BarChart;
