/**
 * Utility functions for benefit-related components
 */

/**
 * Calculates positions for icons on a pie chart
 * @param {number} radius - The radius of the pie chart
 * @param {number} centerX - The x-coordinate of the center
 * @param {number} centerY - The y-coordinate of the center
 * @param {number} multiplier - Distance multiplier from center
 * @returns {Array} Array of position objects with x and y coordinates
 */
export function calculateIconPositions(radius = 48, centerX = 150, centerY = 150, multiplier = 1.8) {
  // Calculate positions at the center of each segment (45°, 135°, 225°, 315°)
  return [
    // Top-right (Cognitive)
    {
      x: centerX + Math.cos(Math.PI * 0.25) * radius * multiplier,
      y: centerY - Math.sin(Math.PI * 0.25) * radius * multiplier
    },
    // Bottom-right (Motor)
    {
      x: centerX + Math.cos(Math.PI * 0.75) * radius * multiplier,
      y: centerY + Math.sin(Math.PI * 0.75) * radius * multiplier
    },
    // Bottom-left (Language)
    {
      x: centerX - Math.cos(Math.PI * 0.75) * radius * multiplier,
      y: centerY + Math.sin(Math.PI * 0.75) * radius * multiplier
    },
    // Top-left (Social)
    {
      x: centerX - Math.cos(Math.PI * 0.25) * radius * multiplier,
      y: centerY - Math.sin(Math.PI * 0.25) * radius * multiplier
    }
  ];
}