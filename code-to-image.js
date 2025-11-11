import fs from "fs";
import path from "path";
import { createCanvas } from "canvas";

function listFiles(dir) {
  let results = [];
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) results = results.concat(listFiles(full));
    else results.push(full);
  }
  return results;
}

function generateImage(rootDir, outputFile = "src_code_full.png") {
  const files = listFiles(rootDir);
  let allText = "";

  for (const file of files.sort()) {
    try {
      const content = fs.readFileSync(file, "utf8");
      allText += `\n\n# ${file}\n${content}`;
    } catch (err) {
      console.warn("Erreur lecture", file);
    }
  }

  // paramètres d’image
  const charsPerLine = 240;
  const lines = [];
  for (let i = 0; i < allText.length; i += charsPerLine)
    lines.push(allText.slice(i, i + charsPerLine));

  const fontSize = 12;
  const lineHeight = 14;
  const width = charsPerLine * 7;
  const height = lines.length * lineHeight;

  const maxHeight = 40000; // limite de sécurité
  const cropped = height > maxHeight;
  const canvas = createCanvas(width, Math.min(height, maxHeight));
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#000";
  ctx.font = `${fontSize}px monospace`;

  let y = fontSize;
  for (let i = 0; i < lines.length && y < maxHeight; i++) {
    ctx.fillText(lines[i], 0, y);
    y += lineHeight;
  }

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outputFile, buffer);
  console.log(`✅ Image générée : ${outputFile}${cropped ? " (tronquée)" : ""}`);
}

generateImage("./src");
