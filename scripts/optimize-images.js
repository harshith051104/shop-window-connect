/**
 * Batch Image Optimization Script
 * 
 * This script converts and optimizes all JPG, JPEG, and PNG images to WebP format.
 * It maintains the folder structure and creates optimized versions.
 * 
 * Usage:
 *   npm install sharp --save-dev
 *   node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  inputDir: './source-images',  // Place your original images here
  outputDir: './public/images',
  quality: 85,
  maxWidth: 800,
  maxHeight: 800,
  formats: ['.jpg', '.jpeg', '.png'],
};

// Ensure output directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

// Get all image files recursively
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (CONFIG.formats.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

// Optimize single image
async function optimizeImage(inputPath) {
  try {
    const relativePath = path.relative(CONFIG.inputDir, inputPath);
    const outputPath = path.join(
      CONFIG.outputDir,
      relativePath.replace(path.extname(relativePath), '.webp')
    );

    // Ensure output directory exists
    ensureDir(path.dirname(outputPath));

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();

    // Calculate new dimensions while maintaining aspect ratio
    let width = metadata.width;
    let height = metadata.height;

    if (width > CONFIG.maxWidth || height > CONFIG.maxHeight) {
      const widthRatio = CONFIG.maxWidth / width;
      const heightRatio = CONFIG.maxHeight / height;
      const ratio = Math.min(widthRatio, heightRatio);

      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }

    // Process and save image
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: CONFIG.quality })
      .toFile(outputPath);

    // Get file sizes
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(1);

    console.log(`✅ ${relativePath}`);
    console.log(`   ${formatBytes(inputSize)} → ${formatBytes(outputSize)} (${reduction}% reduction)`);

    return { success: true, inputSize, outputSize };
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
    return { success: false };
  }
}

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Main function
async function main() {
  console.log('🚀 Starting image optimization...\n');

  // Check if input directory exists
  if (!fs.existsSync(CONFIG.inputDir)) {
    console.log(`⚠️  Input directory not found: ${CONFIG.inputDir}`);
    console.log(`📝 Creating directory structure...`);
    ensureDir(CONFIG.inputDir);
    console.log(`\n📸 Please place your images in the "${CONFIG.inputDir}" folder and run again.`);
    
    // Create example structure
    const exampleDirs = [
      'products/notebooks',
      'products/pens',
      'products/geometry',
      'products/school-supplies',
      'products/office-supplies',
      'products/art-craft',
      'gifts',
      'placeholders',
    ];
    
    exampleDirs.forEach(dir => {
      ensureDir(path.join(CONFIG.inputDir, dir));
    });
    
    console.log('\n📁 Created example folder structure in source-images/');
    return;
  }

  // Get all image files
  const imageFiles = getImageFiles(CONFIG.inputDir);

  if (imageFiles.length === 0) {
    console.log(`⚠️  No images found in ${CONFIG.inputDir}`);
    console.log(`📝 Supported formats: ${CONFIG.formats.join(', ')}`);
    return;
  }

  console.log(`📊 Found ${imageFiles.length} images to process\n`);

  // Process all images
  let totalInputSize = 0;
  let totalOutputSize = 0;
  let successCount = 0;

  for (const imagePath of imageFiles) {
    const result = await optimizeImage(imagePath);
    if (result.success) {
      successCount++;
      totalInputSize += result.inputSize;
      totalOutputSize += result.outputSize;
    }
    console.log(''); // Empty line for readability
  }

  // Summary
  console.log('─'.repeat(50));
  console.log('📈 Summary:');
  console.log(`   Processed: ${successCount}/${imageFiles.length} images`);
  console.log(`   Total size: ${formatBytes(totalInputSize)} → ${formatBytes(totalOutputSize)}`);
  const totalReduction = ((1 - totalOutputSize / totalInputSize) * 100).toFixed(1);
  console.log(`   Reduction: ${totalReduction}%`);
  console.log('─'.repeat(50));
  console.log('✨ Done!');
}

// Run the script
main().catch(console.error);
