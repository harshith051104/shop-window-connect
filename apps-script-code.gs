// ============================================
// NANDI STATIONERY - GOOGLE SHEETS API
// ============================================

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  PRODUCTS_SHEET: 'products',
  CATEGORIES_SHEET: 'categories',
  CACHE_DURATION_MINUTES: 1,
  MAX_ITEMS_PER_PAGE: 100,
  DEFAULT_PAGE_SIZE: 50
};

const CACHE = CacheService.getScriptCache();

// ============================================
// MAIN ENTRY POINT
// ============================================

function doGet(e) {
  const params = e.parameter;
  const action = params.action || 'getProducts';
  
  // Log all incoming parameters for debugging
  Logger.log('Incoming params: ' + JSON.stringify(params));
  
  try {
    let response;
    
    // Clear cache option for debugging - clear specific category cache
    if (params.clearCache === 'true') {
      const category = params.category || '';
      const page = params.page || '1';
      const limit = params.limit || '50';
      const search = params.search || '';
      const cacheKey = `products_${category}_${page}_${limit}_${search}`;
      CACHE.remove(cacheKey);
      CACHE.remove('categories_all');
      Logger.log('Cache cleared for: ' + cacheKey);
    }
    
    switch(action) {
      case 'getProducts':
        response = getProducts(params);
        break;
      case 'getCategories':
        response = getCategories();
        break;
      case 'getProductById':
        response = getProductById(params.id);
        break;
      case 'debug':
        response = debugSheet();
        break;
      default:
        response = { error: 'Invalid action: ' + action, status: 404 };
    }
    
    return createResponse(response);
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return createResponse({
      error: error.toString(),
      status: 500
    });
  }
}

// Debug function to show sheet contents
function debugSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.PRODUCTS_SHEET);
  
  if (!sheet) {
    return { error: 'Sheet not found' };
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  // Find category column
  const categoryIndex = headers.map(h => String(h).trim().toLowerCase()).indexOf('category_slug');
  const categoryIndex2 = headers.map(h => String(h).trim().toLowerCase()).indexOf('category');
  
  // Get first 5 category values
  const sampleCategories = [];
  for (let i = 1; i < Math.min(6, data.length); i++) {
    const catCol = categoryIndex !== -1 ? categoryIndex : categoryIndex2;
    sampleCategories.push({
      row: i,
      rawValue: data[i][catCol],
      type: typeof data[i][catCol],
      trimmed: String(data[i][catCol] || '').trim(),
      length: String(data[i][catCol] || '').length
    });
  }
  
  return {
    headers: headers,
    headersLower: headers.map(h => String(h).trim().toLowerCase()),
    categorySlugIndex: categoryIndex,
    categoryIndex: categoryIndex2,
    sampleCategories: sampleCategories,
    totalRows: data.length
  };
}

// ============================================
// PRODUCTS ENDPOINT
// ============================================

// Helper to sanitize input
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input.replace(/[<>]/g, '').trim().substring(0, 100); // Remove potential scripts, trim, limit length
}

function getProducts(params) {
  // Sanitize all inputs
  const category = sanitizeInput(params.category || '');
  const page = parseInt(params.page) || 1;
  const limit = Math.min(parseInt(params.limit) || CONFIG.DEFAULT_PAGE_SIZE, CONFIG.MAX_ITEMS_PER_PAGE);
  const search = sanitizeInput(params.search || '');
  
  // Cache key strategy: JSON.stringify(params) as recommended for simplicity and coverage
  // But we need to be careful about parameter order. Manual construction is safer for cache hits.
  // We'll stick to manual but using sanitized values.
  const cacheKey = `products_${category}_${page}_${limit}_${search}`;
  
  const cached = CACHE.get(cacheKey);
  
  if (cached) {
    // Return cached JSON directly
    return JSON.parse(cached);
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.PRODUCTS_SHEET);
  
  if (!sheet) {
    return {
      error: 'Products sheet not found',
      status: 404
    };
  }
  
  const data = sheet.getDataRange().getValues();
  
  if (data.length < 2) {
    return {
      data: [],
      currentPage: page,
      itemsPerPage: limit,
      totalItems: 0,
      totalPages: 0
    };
  }
  
  // ... rest of processing ...
  
  // (Existing logic for headers and processing)
  const originalHeaders = data[0];
  const headers = data[0].map(h => String(h).trim().toLowerCase());
  const idIndex = headers.indexOf('id');
  const nameIndex = headers.indexOf('name');
  const categoryIndex = headers.indexOf('category_slug') !== -1 ? headers.indexOf('category_slug') : headers.indexOf('category');
  const priceIndex = headers.indexOf('price');
  const imageIndex = headers.indexOf('image_url') !== -1 ? headers.indexOf('image_url') : headers.indexOf('image');
  const stockIndex = headers.indexOf('in_stock');
  const colorsIndex = headers.indexOf('colors');
  
  let products = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[idIndex]) continue;
    
    const rowCategory = String(row[categoryIndex] || '').trim().toLowerCase();
    const filterCategory = String(category || '').trim().toLowerCase();
    
    // Filter by category
    if (filterCategory && rowCategory !== filterCategory) {
      continue;
    }
    
    // Filter by search
    if (search && !row[nameIndex].toLowerCase().includes(search.toLowerCase())) {
      continue;
    }
    
    const product = {
      id: row[idIndex],
      name: row[nameIndex],
      category: row[categoryIndex],
      price: row[priceIndex],
      image: row[imageIndex],
      inStock: row[stockIndex] === true || row[stockIndex] === 'TRUE' || row[stockIndex] === true,
      colors: row[colorsIndex] ? row[colorsIndex].split(',').map(c => c.trim()) : []
    };
    
    products.push(product);
  }
  
  const total = products.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedProducts = products.slice(start, end);
  
  const response = {
    data: paginatedProducts,
    currentPage: page,
    itemsPerPage: limit,
    totalItems: total,
    totalPages: totalPages
  };
  
  // Cache the response
  CACHE.put(cacheKey, JSON.stringify(response), CONFIG.CACHE_DURATION_MINUTES * 60);
  
  return response;
}

// ============================================
// CATEGORIES ENDPOINT
// ============================================

function getCategories() {
  const cacheKey = 'categories_all';
  const cached = CACHE.get(cacheKey);
  
  if (cached) {
    Logger.log('Cache HIT: ' + cacheKey);
    return JSON.parse(cached);
  }
  
  Logger.log('Cache MISS: ' + cacheKey);
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.CATEGORIES_SHEET);
  
  if (!sheet) {
    return {
      error: 'Categories sheet not found. Please create a sheet named "categories"',
      status: 404
    };
  }
  
  const data = sheet.getDataRange().getValues();
  
  if (data.length < 2) {
    return [];
  }
  
  // Parse headers (case-insensitive)
  const headers = data[0].map(h => String(h).trim().toLowerCase());
  const idIndex = headers.indexOf('id');
  const nameIndex = headers.indexOf('name');
  const slugIndex = headers.indexOf('slug');
  const descIndex = headers.indexOf('description');
  const imageIndex = headers.indexOf('image_url') !== -1 ? headers.indexOf('image_url') : headers.indexOf('image');
  const countIndex = headers.indexOf('item_count') !== -1 ? headers.indexOf('item_count') : headers.indexOf('itemcount');
  
  let categories = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    
    if (!row[idIndex]) continue;
    
    categories.push({
      id: row[idIndex],
      name: row[nameIndex],
      slug: row[slugIndex],
      description: row[descIndex],
      image: row[imageIndex],
      itemCount: row[countIndex] || 0
    });
  }
  
  CACHE.put(cacheKey, JSON.stringify(categories), CONFIG.CACHE_DURATION_MINUTES * 60);
  
  return categories;
}

// ============================================
// SINGLE PRODUCT ENDPOINT
// ============================================

function getProductById(productId) {
  if (!productId) {
    return { error: 'Product ID required', status: 400 };
  }
  
  const cacheKey = `product_${productId}`;
  const cached = CACHE.get(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.PRODUCTS_SHEET);
  const data = sheet.getDataRange().getValues();
  
  const headers = data[0];
  const idIndex = headers.indexOf('id');
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    
    if (row[idIndex] === productId) {
      const nameIndex = headers.indexOf('name');
      const categoryIndex = headers.indexOf('category_slug') !== -1 ? headers.indexOf('category_slug') : headers.indexOf('category');
      const priceIndex = headers.indexOf('price');
      const imageIndex = headers.indexOf('image_url') !== -1 ? headers.indexOf('image_url') : headers.indexOf('image');
      const stockIndex = headers.indexOf('in_stock');
      const colorsIndex = headers.indexOf('colors');
      
      const product = {
        id: row[idIndex],
        name: row[nameIndex],
        category: row[categoryIndex],
        price: row[priceIndex],
        image: row[imageIndex],
        inStock: row[stockIndex] === true || row[stockIndex] === 'TRUE',
        colors: row[colorsIndex] ? row[colorsIndex].split(',').map(c => c.trim()) : []
      };
      
      CACHE.put(cacheKey, JSON.stringify(product), CONFIG.CACHE_DURATION_MINUTES * 60);
      
      return product;
    }
  }
  
  return { error: 'Product not found', status: 404 };
}

// ============================================
// HELPER FUNCTIONS - CORS ENABLED
// ============================================

function createResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  
  // Add CORS headers
  return output;
}

// ============================================
// CACHE MANAGEMENT
// ============================================

function clearCache() {
  CACHE.removeAll(['products', 'categories']);
  return { success: true, message: 'Cache cleared' };
}
