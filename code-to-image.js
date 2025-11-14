import fs from "fs";
import path from "path";
import { createCanvas } from "canvas";

/**
 * Recursively lists all files in a directory and its subdirectories
 * @param {string} dir - The directory path to scan
 * @returns {string[]} Array of file paths
 */
function listFiles(dir) {
  let results = [];
  
  // Read all entries in the directory
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    
    // If it's a directory, recursively get its files
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(listFiles(full));
    } else {
      // If it's a file, add it to results
      results.push(full);
    }
  }
  
  return results;
}

/**
 * Generates a PNG image containing all source code from a directory
 * @param {string} rootDir - The root directory to scan for code files
 * @param {string} outputFile - The output PNG filename (default: "src_code_full.png")
 */
function generateImage(rootDir, outputFile = "src_code_full.png") {
  // Get all files from the directory
  const files = listFiles(rootDir);
  
  // Initialize the text content that will be rendered
  let allText = "";
  
  // Read each file and append its content to allText
  for (const file of files.sort()) {
    try {
      const content = fs.readFileSync(file, "utf8");
      // Add file path as header followed by its content
      allText += `\n\n# ${file}\n${content}`;
    } catch (err) {
      // Log warning if file cannot be read
      console.warn("Read error", file);
    }
  }
  
  // Image rendering parameters
  const charsPerLine = 240;  // Maximum characters per line
  const lines = [];
  
  // Split the text into fixed-width lines
  for (let i = 0; i < allText.length; i += charsPerLine) {
    lines.push(allText.slice(i, i + charsPerLine));
  }
  
  // Canvas and text styling parameters
  const fontSize = 12;           // Font size in pixels
  const lineHeight = 14;         // Spacing between lines in pixels
  const width = charsPerLine * 7; // Canvas width (approximate char width)
  const height = lines.length * lineHeight; // Total required height
  const maxHeight = 40000;       // Maximum height limit for memory safety
  
  // Check if the image will be cropped
  const cropped = height > maxHeight;
  
  // Create canvas with limited height if necessary
  const canvas = createCanvas(width, Math.min(height, maxHeight));
  const ctx = canvas.getContext("2d");
  
  // Fill background with white
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  
  // Set text color to black and font
  ctx.fillStyle = "#000";
  ctx.font = `${fontSize}px monospace`;
  
  // Render each line of text
  let y = fontSize; // Starting Y position
  for (let i = 0; i < lines.length && y < maxHeight; i++) {
    ctx.fillText(lines[i], 0, y);
    y += lineHeight;
  }
  
  // Convert canvas to PNG buffer and save to file
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outputFile, buffer);
  
  // Log success message with cropping info if applicable
  console.log(`✅ Image generated: ${outputFile}${cropped ? " (cropped)" : ""}`);
}

// Execute: Generate image from ./src directory
generateImage("./src");
