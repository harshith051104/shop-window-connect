// ============================================================
// NANDI STATIONERY — GOOGLE SHEETS API
// Version: 3.0  |  Clean, production-ready, no hardcoding
// ============================================================

// ============================================================
// CONFIGURATION
// ============================================================

const CONFIG = {
  PRODUCTS_SHEET:         'products',
  CATEGORIES_SHEET:       'categories',
  CACHE_DURATION_MINUTES: 1,
  MAX_ITEMS_PER_PAGE:     100,
  DEFAULT_PAGE_SIZE:      50,

  // ── Variant column definitions ──────────────────────────
  // Order = priority: first match with a non-empty cell wins.
  // To add a new variant type (e.g. "weight"), just add an entry here.
  // No changes needed anywhere else in the script.
  VARIANT_COLUMNS: [
    { type: 'size',     aliases: ['size', 'sizes']                },
    { type: 'pages',    aliases: ['pages', 'page']                },
    { type: 'quantity', aliases: ['quantity', 'qty', 'quantities'] },
  ],
};

const CACHE = CacheService.getScriptCache();

// ============================================================
// ENTRY POINT
// ============================================================

function doGet(e) {
  const params = e.parameter;
  const action = params.action || 'getProducts';

  Logger.log('[doGet] params=' + JSON.stringify(params));

  try {
    if (params.clearCache === 'true') {
      _bustCache(params);
    }

    let response;
    switch (action) {
      case 'getProducts':    response = getProducts(params);       break;
      case 'getCategories':  response = getCategories();           break;
      case 'getProductById': response = getProductById(params.id); break;
      case 'debug':          response = debugSheet();              break;
      default:
        response = { error: 'Unknown action: ' + action, status: 404 };
    }

    return _createResponse(response);

  } catch (err) {
    Logger.log('[doGet] FATAL: ' + err.toString());
    return _createResponse({ error: err.toString(), status: 500 });
  }
}

function _bustCache(params) {
  const keys = [
    'categories_all',
    'products_' + (params.category||'') + '_' + (params.subcategory||'') + '_' +
      (params.page||1) + '_' + (params.limit||CONFIG.DEFAULT_PAGE_SIZE) + '_' + (params.search||''),
  ];
  keys.forEach(function(k) { CACHE.remove(k); });
  Logger.log('[_bustCache] removed: ' + JSON.stringify(keys));
}

// ============================================================
// ─── CORE VARIANT ENGINE ────────────────────────────────────
//
//  buildVariants(productId, row, colIdx, pricesList)
//
//  Detects which variant column has data for this row (using the
//  priority order in CONFIG.VARIANT_COLUMNS), then pairs each
//  variant value with its corresponding price.
//
//  Returns { variants, variantType, priceRange }
//  or null if the row has no multi-value variant data.
// ============================================================

function buildVariants(productId, row, colIdx, pricesList) {

  // ── Step 1: find the first variant column that has a non-empty cell ──
  var variantRaw  = '';
  var variantType = '';

  for (var c = 0; c < colIdx.variantCols.length; c++) {
    var vc = colIdx.variantCols[c];
    if (vc.colIndex === -1) continue;              // column absent from sheet

    var cellVal = String(row[vc.colIndex] || '').trim();
    if (!cellVal) continue;                        // empty cell — try next

    variantRaw  = cellVal;
    variantType = vc.type;
    break;                                         // first non-empty wins
  }

  // ── Step 2: no variant column has data → simple product ──
  if (!variantRaw) return null;

  var variantList = _parseCSV(variantRaw);

  // ── Step 3: qualify as multi-variant ──
  // True when EITHER side has more than one value, covering:
  //   quantity="1, Pack of 10"  price="₹4, ₹70"    ← both multi
  //   size="S, M, L"            price="₹100"         ← price reused
  //   pages="100"               price="₹15, ₹25"     ← variant reused
  var isMultiVariant = variantList.length > 1 || pricesList.length > 1;

  if (!isMultiVariant) {
    Logger.log(
      '[buildVariants] id=' + productId + ' type=' + variantType +
      ' — single value on both sides; treated as simple product.'
    );
    return null;
  }

  // ── Step 4: log count mismatches for easy spreadsheet debugging ──
  if (variantList.length !== pricesList.length) {
    Logger.log(
      '[buildVariants] MISMATCH id=' + productId +
      ' variantType=' + variantType +
      ' variants(' + variantList.length + ')=' + JSON.stringify(variantList) +
      ' prices(' + pricesList.length + ')=' + JSON.stringify(pricesList) +
      ' → shorter list will reuse its last value.'
    );
  }

  // ── Step 5: build variant objects ──
  var count    = Math.max(variantList.length, pricesList.length);
  var variants = [];

  for (var v = 0; v < count; v++) {
    var variantName  = v < variantList.length
      ? variantList[v]
      : variantList[variantList.length - 1];      // reuse last variant name

    var variantPrice = v < pricesList.length
      ? pricesList[v]
      : pricesList[pricesList.length - 1];        // reuse last price

    variants.push({
      id:          productId + '-v' + v,
      name:        variantName,
      price:       variantPrice,
      variantType: variantType,
      _sortKey:    _numericSortKey(variantName, v),
      _priceNum:   _extractNumericPrice(variantPrice),
    });
  }

  // ── Step 6: sort numerically ascending ──
  // Primary key: numeric value extracted from variant name
  // Secondary key: numeric price (breaks ties like "100 pages ₹15" vs "100 pages ₹25")
  variants.sort(function(a, b) {
    return (a._sortKey - b._sortKey) || (a._priceNum - b._priceNum);
  });

  // ── Step 7: compute price range from sorted list ──
  var prices = variants.map(function(v) { return v._priceNum; }).filter(function(n) { return !isNaN(n); });
  var minNum = prices.length ? Math.min.apply(null, prices) : NaN;
  var maxNum = prices.length ? Math.max.apply(null, prices) : NaN;

  var firstVariant = variants[0];
  var lastVariant  = variants[variants.length - 1];

  var priceRange = (!isNaN(minNum) && minNum !== maxNum)
    ? firstVariant.price + ' - ' + lastVariant.price
    : firstVariant.price;

  // ── Step 8: strip internal sort helpers before returning ──
  var cleanVariants = variants.map(function(v) {
    return { id: v.id, name: v.name, price: v.price, variantType: v.variantType };
  });

  Logger.log(
    '[buildVariants] id=' + productId +
    ' type=' + variantType +
    ' count=' + cleanVariants.length +
    ' range="' + priceRange + '"'
  );

  return {
    variants:    cleanVariants,
    variantType: variantType,
    priceRange:  priceRange,
  };
}

// ============================================================
// ─── SHARED COLUMN INDEX RESOLVER ───────────────────────────
//
//  Call once per sheet read. Returns a plain colIdx object that
//  both getProducts() and getProductById() pass into buildVariants().
// ============================================================

function _resolveColumnIndices(nh) {
  // Category: prefer category_slug over category
  var categorySlug = _findCol(nh, ['categoryslug']);
  var categoryFb   = _findCol(nh, ['category']);

  // Resolve variant columns in CONFIG priority order
  var variantCols = CONFIG.VARIANT_COLUMNS.map(function(vc) {
    return { type: vc.type, colIndex: _findCol(nh, vc.aliases) };
  });

  return {
    id:          _findCol(nh, ['id']),
    name:        _findCol(nh, ['name']),
    price:       _findCol(nh, ['price']),
    image:       _findCol(nh, ['imageurl', 'image']),
    inStock:     _findCol(nh, ['instock']),
    colors:      _findCol(nh, ['colors', 'color']),
    description: _findCol(nh, ['description', 'desc']),
    subcategory: _findCol(nh, ['subcategory', 'subcategories', 'subcat']),
    category:    categorySlug !== -1 ? categorySlug : categoryFb,
    variantCols: variantCols,
  };
}

// ============================================================
// PRODUCTS ENDPOINT
// ============================================================

function getProducts(params) {
  var category    = _sanitize(params.category    || '');
  var subcategory = _sanitize(params.subcategory || '');
  var page        = Math.max(1, parseInt(params.page)  || 1);
  var limit       = Math.min(
    Math.max(1, parseInt(params.limit) || CONFIG.DEFAULT_PAGE_SIZE),
    CONFIG.MAX_ITEMS_PER_PAGE
  );
  var search = _sanitize(params.search || '');

  var cacheKey = 'products_' + category + '_' + subcategory + '_' + page + '_' + limit + '_' + search;
  var cached   = CACHE.get(cacheKey);
  if (cached) {
    Logger.log('[getProducts] cache HIT: ' + cacheKey);
    return JSON.parse(cached);
  }

  var sheet = _getSheet(CONFIG.PRODUCTS_SHEET);
  if (!sheet) return { error: 'Products sheet not found', status: 404 };

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    return { data: [], currentPage: page, itemsPerPage: limit, totalItems: 0, totalPages: 0 };
  }

  var nh     = _normalizeHeaders(data[0]);
  var colIdx = _resolveColumnIndices(nh);

  Logger.log('[getProducts] colIdx=' + JSON.stringify({
    id: colIdx.id, name: colIdx.name, price: colIdx.price,
    category: colIdx.category, subcategory: colIdx.subcategory,
    variantCols: colIdx.variantCols,
  }));

  var products = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];

    // Skip blank rows
    if (colIdx.id === -1 || (!row[colIdx.id] && row[colIdx.id] !== 0)) continue;

    // Category / subcategory filters
    var rowCat    = _cellStr(row, colIdx.category).toLowerCase();
    var rowSubCat = _cellStr(row, colIdx.subcategory).toLowerCase();
    if (category    && rowCat    !== category.toLowerCase())    continue;
    if (subcategory && rowSubCat !== subcategory.toLowerCase()) continue;

    // Search filter
    var rawName = _cellStr(row, colIdx.name);
    if (search && rawName.toLowerCase().indexOf(search.toLowerCase()) === -1) continue;

    // Common fields
    var productId  = row[colIdx.id];
    var priceRaw   = _cellStr(row, colIdx.price);
    var pricesList = _parseCSV(priceRaw);
    var image      = _cellStr(row, colIdx.image);
    var inStock    = _parseBoolean(row[colIdx.inStock]);
    var colors     = colIdx.colors !== -1 ? _parseCSV(row[colIdx.colors]) : [];
    var desc       = _cellStr(row, colIdx.description);
    var catVal     = colIdx.category    !== -1 ? row[colIdx.category]    : '';
    var subCatVal  = colIdx.subcategory !== -1 ? row[colIdx.subcategory] : '';

    // Variant engine
    var vResult = buildVariants(productId, row, colIdx, pricesList);

    if (vResult) {
      products.push({
        id:          productId,
        name:        rawName,
        category:    catVal,
        subcategory: subCatVal,
        price:       vResult.variants[0].price,
        priceRange:  vResult.priceRange,
        image:       image,
        inStock:     inStock,
        colors:      colors,
        description: desc,
        variantType: vResult.variantType,
        variants:    vResult.variants,
      });
    } else {
      products.push({
        id:          productId,
        name:        rawName,
        category:    catVal,
        subcategory: subCatVal,
        price:       pricesList[0] || priceRaw,
        image:       image,
        inStock:     inStock,
        colors:      colors,
        description: desc,
      });
    }
  }

  // Pagination
  var total      = products.length;
  var totalPages = Math.ceil(total / limit) || 1;
  var start      = (page - 1) * limit;
  var paginated  = products.slice(start, start + limit);

  var response = {
    data:         paginated,
    currentPage:  page,
    itemsPerPage: limit,
    totalItems:   total,
    totalPages:   totalPages,
  };

  CACHE.put(cacheKey, JSON.stringify(response), CONFIG.CACHE_DURATION_MINUTES * 60);
  return response;
}

// ============================================================
// CATEGORIES ENDPOINT
// ============================================================

function getCategories() {
  var cacheKey = 'categories_all';
  var cached   = CACHE.get(cacheKey);
  if (cached) {
    Logger.log('[getCategories] cache HIT');
    return JSON.parse(cached);
  }

  var sheet = _getSheet(CONFIG.CATEGORIES_SHEET);
  if (!sheet) return { error: 'Categories sheet not found', status: 404 };

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  var nh = _normalizeHeaders(data[0]);

  var idIdx    = _findCol(nh, ['id']);
  var nameIdx  = _findCol(nh, ['name']);
  var slugIdx  = _findCol(nh, ['slug']);
  var descIdx  = _findCol(nh, ['description', 'desc']);
  var imageIdx = _findCol(nh, ['imageurl', 'image']);
  var countIdx = _findCol(nh, ['itemcount', 'itemcount']);

  var categories = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (idIdx === -1 || (!row[idIdx] && row[idIdx] !== 0)) continue;

    categories.push({
      id:          row[idIdx],
      name:        nameIdx  !== -1 ? String(row[nameIdx]  || '') : '',
      slug:        slugIdx  !== -1 ? String(row[slugIdx]  || '') : '',
      description: descIdx  !== -1 ? String(row[descIdx]  || '') : '',
      image:       imageIdx !== -1 ? String(row[imageIdx] || '') : '',
      itemCount:   countIdx !== -1 ? (row[countIdx] || 0) : 0,
    });
  }

  CACHE.put(cacheKey, JSON.stringify(categories), CONFIG.CACHE_DURATION_MINUTES * 60);
  return categories;
}

// ============================================================
// SINGLE PRODUCT ENDPOINT
// ============================================================

function getProductById(productId) {
  if (!productId) return { error: 'Product ID required', status: 400 };

  var cacheKey = 'product_' + productId;
  var cached   = CACHE.get(cacheKey);
  if (cached) return JSON.parse(cached);

  var sheet = _getSheet(CONFIG.PRODUCTS_SHEET);
  if (!sheet) return { error: 'Products sheet not found', status: 404 };

  var data   = sheet.getDataRange().getValues();
  var nh     = _normalizeHeaders(data[0]);
  var colIdx = _resolveColumnIndices(nh);

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (String(row[colIdx.id]) !== String(productId)) continue;

    var priceRaw   = _cellStr(row, colIdx.price);
    var pricesList = _parseCSV(priceRaw);
    var image      = _cellStr(row, colIdx.image);
    var inStock    = _parseBoolean(row[colIdx.inStock]);
    var colors     = colIdx.colors !== -1 ? _parseCSV(row[colIdx.colors]) : [];
    var desc       = _cellStr(row, colIdx.description);

    var vResult = buildVariants(productId, row, colIdx, pricesList);

    var product = {
      id:          row[colIdx.id],
      name:        _cellStr(row, colIdx.name),
      category:    colIdx.category !== -1 ? row[colIdx.category] : '',
      price:       vResult ? vResult.variants[0].price : (pricesList[0] || priceRaw),
      priceRange:  vResult ? vResult.priceRange : null,
      image:       image,
      inStock:     inStock,
      colors:      colors,
      description: desc,
      variantType: vResult ? vResult.variantType : null,
      variants:    vResult ? vResult.variants    : null,
    };

    CACHE.put(cacheKey, JSON.stringify(product), CONFIG.CACHE_DURATION_MINUTES * 60);
    return product;
  }

  return { error: 'Product not found', status: 404 };
}

// ============================================================
// DEBUG ENDPOINT  —  call ?action=debug
// Shows header resolution + variant engine output per sample row
// ============================================================

function debugSheet() {
  var sheet = _getSheet(CONFIG.PRODUCTS_SHEET);
  if (!sheet) return { error: 'Sheet not found' };

  var data   = sheet.getDataRange().getValues();
  var rawHdr = data[0];
  var nh     = _normalizeHeaders(rawHdr);
  var colIdx = _resolveColumnIndices(nh);

  var sampleRows = [];
  for (var i = 1; i < Math.min(6, data.length); i++) {
    var row    = data[i];
    var sample = {
      rowNumber:     i + 1,
      id:            row[colIdx.id],
      price:         _cellStr(row, colIdx.price),
      variantCells:  {},
      variantResult: null,
    };

    colIdx.variantCols.forEach(function(vc) {
      sample.variantCells[vc.type] = vc.colIndex !== -1
        ? String(row[vc.colIndex] || '')
        : 'COLUMN_NOT_IN_SHEET';
    });

    var pricesList = _parseCSV(_cellStr(row, colIdx.price));
    sample.variantResult = buildVariants(row[colIdx.id], row, colIdx, pricesList);

    sampleRows.push(sample);
  }

  return {
    rawHeaders:        rawHdr,
    normalizedHeaders: nh,
    resolvedIndices: {
      id: colIdx.id, name: colIdx.name, price: colIdx.price,
      image: colIdx.image, inStock: colIdx.inStock,
      colors: colIdx.colors, description: colIdx.description,
      category: colIdx.category, subcategory: colIdx.subcategory,
      variantCols: colIdx.variantCols,
    },
    sampleRows: sampleRows,
    totalRows:  data.length,
  };
}

// ============================================================
// ─── PRIVATE UTILITY FUNCTIONS ──────────────────────────────
// ============================================================

/** Normalize a header: lowercase + strip every non-alpha character */
function _normalizeHeaders(rawRow) {
  return rawRow.map(function(h) {
    return String(h).toLowerCase().replace(/[^a-z]/g, '');
  });
}

/** Return the index of the first header that matches any alias, or -1 */
function _findCol(normalizedHeaders, aliases) {
  return normalizedHeaders.findIndex(function(h) {
    return aliases.indexOf(h) !== -1;
  });
}

/** Safely read a cell as a trimmed string; returns '' for missing columns */
function _cellStr(row, colIndex) {
  return colIndex !== -1 ? String(row[colIndex] || '').trim() : '';
}

/**
 * Parse a comma-separated string into a clean, non-empty string array.
 * Handles numbers (e.g. Sheets auto-converts "₹4" → stores as text) safely.
 */
function _parseCSV(raw) {
  if (raw === null || raw === undefined || raw === '') return [];
  return String(raw).split(',').map(function(v) { return v.trim(); }).filter(Boolean);
}

/** Coerce a spreadsheet cell value to a JS boolean */
function _parseBoolean(cell) {
  return cell === true || String(cell).toUpperCase() === 'TRUE';
}

/**
 * Extract the leading (or only) integer from a variant name for sort.
 * "100 pages" → 100 | "Pack of 20" → 20 | "A4" → 4 | "XL" → fallback index
 */
function _numericSortKey(name, fallback) {
  var m = String(name).match(/(\d+)/);
  return m ? parseInt(m[1], 10) : fallback;
}

/**
 * Strip currency symbols / spaces and parse as float for price comparison.
 * "₹70" → 70 | "Rs.4.50" → 4.5 | "free" → NaN
 */
function _extractNumericPrice(priceStr) {
  var cleaned = String(priceStr).replace(/[^0-9.]/g, '');
  return parseFloat(cleaned);
}

/** Strip potential XSS characters from URL query-param inputs */
function _sanitize(input) {
  if (typeof input !== 'string') return input;
  return input.replace(/[<>]/g, '').trim().substring(0, 100);
}

/** Return a sheet by name, or null if it doesn't exist */
function _getSheet(sheetName) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}

/** Wrap any value in a JSON ContentService response */
function _createResponse(data) {
  var out = ContentService.createTextOutput(JSON.stringify(data));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}

// ============================================================
// MANUAL CACHE CLEAR (run from the Apps Script editor)
// ============================================================
function clearAllCache() {
  CACHE.removeAll(['categories_all']);
  Logger.log('[clearAllCache] done');
  return { success: true };
}