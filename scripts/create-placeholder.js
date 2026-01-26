/**
 * Create a placeholder image for the stationery shop
 * 
 * Usage:
 *   npm install sharp --save-dev
 *   node scripts/create-placeholder.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  width: 800,
  height: 600,
  outputDir: './public/images/placeholders',
  outputFile: 'product-placeholder.webp',
};

async function createPlaceholder() {
  console.log('🎨 Creating placeholder image...\n');

  // Ensure output directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  const outputPath = path.join(CONFIG.outputDir, CONFIG.outputFile);

  // Create a simple SVG placeholder
  const svg = `
    <svg width="${CONFIG.width}" height="${CONFIG.height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text 
        x="50%" 
        y="45%" 
        font-family="Arial, sans-serif" 
        font-size="32" 
        font-weight="bold"
        fill="#9ca3af" 
        text-anchor="middle" 
        dominant-baseline="middle">
        Shop Window
      </text>
      <text 
        x="50%" 
        y="55%" 
        font-family="Arial, sans-serif" 
        font-size="24" 
        fill="#9ca3af" 
        text-anchor="middle" 
        dominant-baseline="middle">
        Product Image
      </text>
      <circle cx="400" cy="280" r="60" fill="none" stroke="#d1d5db" stroke-width="4"/>
      <circle cx="400" cy="280" r="10" fill="#d1d5db"/>
      <line x1="380" y1="300" x2="360" y2="330" stroke="#d1d5db" stroke-width="4" stroke-linecap="round"/>
      <line x1="420" y1="300" x2="440" y2="330" stroke="#d1d5db" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `;

  try {
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`✅ Placeholder created: ${outputPath}`);
    console.log(`   Size: ${(stats.size / 1024).toFixed(1)} KB`);
    console.log(`   Dimensions: ${CONFIG.width}x${CONFIG.height}px`);
    console.log('\n✨ Done!');
  } catch (error) {
    console.error('❌ Error creating placeholder:', error.message);
  }
}

createPlaceholder();
