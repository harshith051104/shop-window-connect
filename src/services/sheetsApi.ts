// Google Sheets API Service Layer
// This replaces the hardcoded product data with dynamic API calls

const API_BASE_URL = import.meta.env.VITE_SHEETS_API_URL;

// Log the API URL on load for debugging
console.log('📡 Sheets API URL:', API_BASE_URL);

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Single", "Pack of 10", "100 pages", "A4", "₹15"
  price: string;
  image?: string;
  inStock: boolean;
  variantType?: 'pages' | 'size' | 'quantity' | 'price'; // Type of variant from spreadsheet
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: string;
  image: string;
  inStock: boolean;
  colors: string[];
  description?: string;
  variants?: ProductVariant[]; // Variants with price mapping (pages, size, quantity, price)
  priceRange?: string; // e.g., "₹5 - ₹50"
  variantType?: 'pages' | 'size' | 'quantity' | 'price'; // Type of variants from spreadsheet column
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface CategoryResponse {
  data: Category[];
  timestamp: string;
}

// In-memory cache to reduce API calls
const memoryCache = new Map<string, { data: unknown; expiry: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Rate limiting - prevent excessive API calls
const requestTimestamps: number[] = [];
const RATE_LIMIT_WINDOW = 10 * 1000; // 10 seconds
const MAX_REQUESTS_PER_WINDOW = 20;

function checkRateLimit(): boolean {
  const now = Date.now();
  // Remove timestamps older than the window
  while (requestTimestamps.length > 0 && requestTimestamps[0] < now - RATE_LIMIT_WINDOW) {
    requestTimestamps.shift();
  }
  if (requestTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    console.warn('⚠️ Rate limit exceeded');
    return false;
  }
  requestTimestamps.push(now);
  return true;
}

// Input validation - sanitize before sending to API
function sanitizeInput(input: string, maxLength: number = 100): string {
  if (!input) return '';
  // Allow alphanumeric, spaces, hyphens only
  return input.replace(/[^a-zA-Z0-9\s\-]/g, '').trim().substring(0, maxLength);
}

function validateCategory(category: string): string {
  // Categories should be lowercase slugs
  return sanitizeInput(category, 50).toLowerCase();
}

function validateSearch(search: string): string {
  // Allow broader characters for search but limit length
  return search.trim().substring(0, 100);
}

// Clear all cached data - useful when API URL changes
export function clearApiCache() {
  memoryCache.clear();
  console.log('🗑️ API cache cleared');
}

function getCached<T>(key: string): T | null {
  const cached = memoryCache.get(key);
  if (cached && cached.expiry > Date.now()) {
    console.log(`✅ Cache HIT: ${key}`);
    return cached.data as T;
  }
  if (cached) {
    console.log(`❌ Cache EXPIRED: ${key}`);
    memoryCache.delete(key);
  }
  return null;
}

function setCache(key: string, data: unknown) {
  memoryCache.set(key, {
    data,
    expiry: Date.now() + CACHE_DURATION
  });
  console.log(`💾 Cached: ${key}`);
}

/**
 * Fetch all categories from Google Sheets
 */
export async function fetchCategories(): Promise<Category[]> {
  const cacheKey = 'categories';
  const cached = getCached<Category[]>(cacheKey);

  if (cached) {
    return cached;
  }

  // Rate limiting check
  if (!checkRateLimit()) {
    throw new Error('Too many requests. Please wait a moment.');
  }

  try {
    const url = `${API_BASE_URL}?action=getCategories`;
    console.log(`🌐 Fetching: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: Category[] = await response.json();
    setCache(cacheKey, result);

    return result;
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    throw error;
  }
}

/**
 * Fetch products with pagination and filtering
 * 
 * @param category - Category slug (e.g., 'pens-pencils')
 * @param page - Page number (1-indexed)
 * @param limit - Items per page (max 100)
 * @param search - Search query (optional)
 */
export async function fetchProducts(
  category: string,
  page: number = 1,
  limit: number = 50,
  search: string = '',
  subcategory: string = ''
): Promise<PaginatedResponse<ProductItem>> {
  // Validate and sanitize inputs
  const safeCategory = validateCategory(category);
  const safeSubcategory = validateCategory(subcategory);
  const safeSearch = validateSearch(search);
  const safePage = Math.max(1, Math.min(page, 10000));
  const safeLimit = Math.max(1, Math.min(limit, 100));

  const cacheKey = `products_${safeCategory}_${safeSubcategory}_${safePage}_${safeLimit}_${safeSearch}`;
  const cached = getCached<PaginatedResponse<ProductItem>>(cacheKey);

  // Only use cache if it has data (avoid caching empty results)
  if (cached && cached.totalItems > 0) {
    return cached;
  }

  // Rate limiting check
  if (!checkRateLimit()) {
    throw new Error('Too many requests. Please wait a moment.');
  }

  try {
    const params = new URLSearchParams({
      action: 'getProducts',
      category: safeCategory,
      page: safePage.toString(),
      limit: safeLimit.toString()
    });

    if (safeSearch) {
      params.append('search', safeSearch);
    }

    if (safeSubcategory) {
      params.append('subcategory', safeSubcategory);
    }

    const url = `${API_BASE_URL}?${params.toString()}`;
    console.log(`🌐 Fetching: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: PaginatedResponse<ProductItem> = await response.json();
    
    // Debug: Log raw response
    console.log(`📥 API Response for ${safeCategory}:`, {
      totalItems: result.totalItems,
      firstProduct: result.data[0],
      hasVariants: result.data[0]?.variants ? 'YES' : 'NO'
    });
    
    // Debug: Log products with variants
    const productsWithVariants = result.data.filter(p => p.variants && p.variants.length > 0);
    if (productsWithVariants.length > 0) {
      console.log(`📦 Products with variants:`, productsWithVariants.map(p => ({
        name: p.name,
        variantType: p.variantType,
        variantCount: p.variants?.length
      })));
    } else {
      console.log(`⚠️ No products with variants found in response`);
    }

    // Only cache if we have data
    if (result.totalItems > 0) {
      setCache(cacheKey, result);
    }

    return result;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch a single product by ID
 * 
 * @param id - Product ID (e.g., 'pen-001')
 */
export async function fetchProductById(id: string): Promise<ProductItem> {
  const cacheKey = `product_${id}`;
  const cached = getCached<{ data: ProductItem }>(cacheKey);

  if (cached) {
    return cached.data;
  }

  try {
    const url = `${API_BASE_URL}?action=getProductById&id=${encodeURIComponent(id)}`;
    console.log(`🌐 Fetching: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ProductItem = await response.json();
    setCache(cacheKey, { data: result });

    return result;
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    throw error;
  }
}

/**
 * Clear the in-memory cache (useful for testing)
 */
export function clearCache() {
  memoryCache.clear();
  console.log('🧹 Cache cleared');
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  const now = Date.now();
  let activeCount = 0;
  let expiredCount = 0;

  memoryCache.forEach(({ expiry }) => {
    if (expiry > now) {
      activeCount++;
    } else {
      expiredCount++;
    }
  });

  return {
    total: memoryCache.size,
    active: activeCount,
    expired: expiredCount
  };
}
