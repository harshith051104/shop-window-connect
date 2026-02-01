// Google Sheets API Service Layer
// This replaces the hardcoded product data with dynamic API calls

const API_BASE_URL = import.meta.env.VITE_SHEETS_API_URL;

// Log the API URL on load for debugging
console.log('📡 Sheets API URL:', API_BASE_URL);

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  inStock: boolean;
  colors: string[];
  description?: string;
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
const memoryCache = new Map<string, { data: any; expiry: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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

function setCache(key: string, data: any) {
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
  search: string = ''
): Promise<PaginatedResponse<ProductItem>> {
  const cacheKey = `products_${category}_${page}_${limit}_${search}`;
  const cached = getCached<PaginatedResponse<ProductItem>>(cacheKey);
  
  // Only use cache if it has data (avoid caching empty results)
  if (cached && cached.totalItems > 0) {
    return cached;
  }

  try {
    const params = new URLSearchParams({
      action: 'getProducts',
      category,
      page: page.toString(),
      limit: limit.toString()
    });
    
    if (search) {
      params.append('search', search);
    }
    
    const url = `${API_BASE_URL}?${params.toString()}`;
    console.log(`🌐 Fetching: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: PaginatedResponse<ProductItem> = await response.json();
    
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
    const url = `${API_BASE_URL}?action=getProductById&id=${id}`;
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
