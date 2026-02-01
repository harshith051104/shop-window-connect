import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { productItems, categories } from '../src/data/products.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL for your deployed site (update this!)
const BASE_URL = 'https://harshith051104.github.io/shop-window-connect';

// Convert products to CSV
function exportProductsToCSV() {
  console.log('📦 Exporting products...');
  
  const headers = ['id', 'name', 'category_slug', 'price', 'image_url', 'in_stock', 'colors', 'description'];
  const rows: string[][] = [headers];

  let totalProducts = 0;

  Object.entries(productItems).forEach(([categorySlug, products]) => {
    products.forEach(product => {
      // Convert relative URLs to absolute
      const imageUrl = product.image.startsWith('http')
        ? product.image
        : `${BASE_URL}${product.image}`;

      rows.push([
        product.id,
        product.name,
        categorySlug,
        product.price,
        imageUrl,
        (product.inStock !== false).toString().toUpperCase(), // TRUE or FALSE
        product.colors?.join(',') || '',
        product.description || ''
      ]);

      totalProducts++;
    });
  });

  const csv = rows.map(row => 
    row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
  ).join('\n');

  fs.writeFileSync(path.join(__dirname, '../exports/products.csv'), csv, 'utf-8');
  console.log(`✅ Exported ${totalProducts} products to exports/products.csv`);
}

// Convert categories to CSV
function exportCategoriesToCSV() {
  console.log('📂 Exporting categories...');
  
  const headers = ['id', 'name', 'slug', 'description', 'image_url', 'item_count'];
  const rows: string[][] = [headers];

  categories.forEach(category => {
    // Convert relative URLs to absolute
    const imageUrl = category.image.startsWith('http')
      ? category.image
      : `${BASE_URL}${category.image}`;

    rows.push([
      category.id,
      category.name,
      category.slug,
      category.description,
      imageUrl,
      category.itemCount.toString()
    ]);
  });

  const csv = rows.map(row => 
    row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
  ).join('\n');

  fs.writeFileSync(path.join(__dirname, '../exports/categories.csv'), csv, 'utf-8');
  console.log(`✅ Exported ${categories.length} categories to exports/categories.csv`);
}

// Create exports directory
const exportsDir = path.join(__dirname, '../exports');
if (!fs.existsSync(exportsDir)) {
  fs.mkdirSync(exportsDir);
}

console.log('\n🚀 Starting export process...\n');
console.log(`📍 Base URL: ${BASE_URL}\n`);

exportProductsToCSV();
exportCategoriesToCSV();

console.log('\n✨ Export complete!\n');
console.log('📋 Next steps:');
console.log('1. Open Google Sheets and create a new spreadsheet');
console.log('2. Create two sheets: "products" and "categories"');
console.log('3. In each sheet: File → Import → Upload → Select the CSV file');
console.log('4. Choose "Replace current sheet" when importing');
console.log('5. Format the in_stock column as checkboxes (Format → Number → Checkbox)');
console.log('\n');
