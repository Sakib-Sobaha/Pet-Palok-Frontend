import React, { useEffect } from "react";
import Chart from "chart.js/auto"; // Import Chart.js library

const BarChart = ({ data }) => {
  // Transform the petTypeMap object into arrays of labels and values
  //   const labels = Object.keys(data);
  const labels = Object.keys(data).filter(
    (key) => key !== "OTHERS" || data[key] !== 0
  );

  const values = labels.map((key) => data[key]);

  useEffect(() => {
    const ctx = document.getElementById("barChart");
    if (ctx) {
      const maxCount = Math.max(...values); // Calculate the maximum value

      const config = {
        type: "bar",
        data: {
          labels, // Use labels array for chart labels
          datasets: [
            {
              label: "Number of Pets Visited",
              backgroundColor: values.map((count) => {
                const percentage = (count / maxCount) * 100; // Calculate the percentage
                if (percentage >= 70) {
                  return "rgba(20, 140, 100, 0.7)"; // Green for high counts
                } else if (percentage < 40) {
                  return "rgba(255, 0, 0, 0.7)"; // Red for low counts
                } else {
                  return "rgba(230, 130, 0, 0.7)"; // Orange for mid counts
                }
              }),
              data: values, // Use values array for chart data
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: maxCount > 0 ? maxCount * 1.1 : 1, // Handle case where all values are zero
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
      <div className="card-title">Pet Type Distribution</div>
      <canvas id="barChart" width="400" height="200"></canvas>
    </div>
  );
};

export default BarChart;
