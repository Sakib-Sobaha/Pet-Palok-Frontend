export function drawHistogram(data) {
  const canvas = document.getElementById("histogramCanvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // Clear the canvas
  ctx.clearRect(0, 0, width, height);

  // Define bar properties
  const barHeight = height / data.length; // Bar height based on number of data points
  const maxSales = Math.max(...data.map(item => item.sales));

  // Set font properties for sales values
  ctx.font = "bold 16px Arial"; // Larger and bolder font for better visibility
  ctx.textAlign = "left"; // Left text alignment for item names
  ctx.textBaseline = "middle"; // Center the text vertically

  // Draw the histogram
  data.forEach((item, index) => {
    const sales = item.sales;
    const barWidth = (sales / maxSales) * (width - 100); // Bar width based on max sales

    // Determine color based on sales percentage
    let color;
    const percentage = (sales / maxSales);
    if (percentage >= 0.7) {
      color = "rgba(20, 140, 100, 0.7)"; // Green
    } else if (percentage >= 0.4) {
      color = "rgba(230, 130, 0, 0.7)"; // Orange
    } else {
      color = "rgba(255, 0, 0, 0.7)"; // Red
    }

    // Draw the bar
    ctx.fillStyle = color;
    ctx.fillRect(20, index * barHeight + 10, barWidth, barHeight - 20); // Offset by 10 for padding

    // Display sales value at the end of the bar, with padding
    ctx.fillStyle = "black"; // Fill color for the text
    ctx.fillText(`${sales}`, barWidth + 30, index * barHeight + barHeight / 2); // Right-aligned sales value

    // Add a white stroke for better visibility
    ctx.strokeStyle = "white"; // Set stroke color to white
    ctx.lineWidth = 0.3; // Set line width for stroke

    // Draw the stroke for sales value
    ctx.strokeText(`${sales}`, barWidth + 30, index * barHeight + barHeight / 2); 

    // Draw the item name to the left of the bar, with padding
    ctx.fillStyle = "black"; // Set fill color for item name
    ctx.fillText(item.name, 5, index * barHeight + barHeight / 2); // Item name to the left

    // Draw stroke for item name
    ctx.strokeStyle = "white"; // Set stroke color to white
    ctx.lineWidth = 0.4; // Set line width for stroke
    

    // Draw the stroke for item name
    ctx.strokeText(item.name, 5, index * barHeight + barHeight / 2); // Item name with stroke
  });
}

// Exporting the function to be used in other files
export function example() {
  return [
    { name: "Item A", sales: 50 },
    { name: "Item B", sales: 30 },
    { name: "Item C", sales: 70 },
    { name: "Item D", sales: 100 },
    { name: "Item E", sales: 20 },
  ];
}
