export interface ProductItem {
  id: string;
  name: string;
  price: string;
  description?: string;
  image: string;
  category: string;
  inStock?: boolean;
  colors?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

// Categories for the main Items page
export const categories: Category[] = [
  {
    id: "pens-pencils",
    name: "Pens & Pencils",
    slug: "pens-pencils",
    description: "Quality writing instruments for school, college & office",
    image: "/images/products/pens/featured.webp",
    itemCount: 48,
  },
  {
    id: "notebooks",
    name: "Notebooks & Registers",
    slug: "notebooks",
    description: "All sizes for school, college & office use",
    image: "/images/products/notebooks/featured.webp",
    itemCount: 18,
  },
  {
    id: "art-drawing",
    name: "Art & Drawing Supplies",
    slug: "art-drawing",
    description: "Colors, paints, and creative supplies",
    image: "/images/products/art-craft/featured.webp",
    itemCount: 29,
  },
  {
    id: "school-essentials",
    name: "School Essentials",
    slug: "school-essentials",
    description: "Everything students need for school",
    image: "/images/products/school-supplies/featured.webp",
    itemCount: 22,
  },
  {
    id: "geometry",
    name: "Geometry & Math",
    slug: "geometry",
    description: "Complete geometry sets and mathematical tools",
    image: "/images/products/geometry/featured.webp",
    itemCount: 12,
  },
  {
    id: "office-supplies",
    name: "Office Supplies",
    slug: "office-supplies",
    description: "Professional supplies for your workspace",
    image: "/images/products/office-supplies/featured.webp",
    itemCount: 16,
  },
];

// Individual products for each category
export const productItems: Record<string, ProductItem[]> = {
  "pens-pencils": [
    // ₹4 Pens
    { id: "pen-001", name: "S. S. Prime", price: "₹4", image: "https://m.media-amazon.com/images/I/41B0pYZc4XL._SX300_SY300_QL70_FMwebp_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    { id: "pen-002", name: "S. S. Sparx", price: "₹4", image: "https://m.media-amazon.com/images/I/41B0pYZc4XL._SX300_SY300_QL70_FMwebp_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    { id: "pen-003", name: "Agni 4G Pro", price: "₹4", image: "https://m.media-amazon.com/images/I/41B0pYZc4XL._SX300_SY300_QL70_FMwebp_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    { id: "pen-004", name: "S. S. Extra Dark", price: "₹4", image: "https://m.media-amazon.com/images/I/41B0pYZc4XL._SX300_SY300_QL70_FMwebp_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    
    // ₹5 Pens
    { id: "pen-005", name: "Totem Meow", price: "₹5", image: "https://m.media-amazon.com/images/I/71E+vqWXJEL._SX522_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    { id: "pen-006", name: "S. S. Butterfly", price: "₹5", image: "https://m.media-amazon.com/images/I/41B0pYZc4XL._SX300_SY300_QL70_FMwebp_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    { id: "pen-007", name: "S. S. Butterfly Glow", price: "₹5", image: "https://m.media-amazon.com/images/I/41B0pYZc4XL._SX300_SY300_QL70_FMwebp_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    { id: "pen-008", name: "Doms INXTRA Classy", price: "₹5", image: "https://m.media-amazon.com/images/I/61W8zKKZqDL._SX522_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    { id: "pen-009", name: "S. S. Arrow", price: "₹5", image: "https://m.media-amazon.com/images/I/41B0pYZc4XL._SX300_SY300_QL70_FMwebp_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    
    // ₹7 Pens
    { id: "pen-010", name: "Flair Ezee Click", price: "₹7", image: "https://m.media-amazon.com/images/I/61gHzKXGi+L._SX522_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    
    // ₹10 Ball Pens
    { id: "pen-011", name: "Cello Techno Tip", price: "₹10", image: "https://m.media-amazon.com/images/I/61KmDnz8YML._SX522_.jpg", category: "pens-pencils", colors: ["Blue", "Black", "Red"] },
    { id: "pen-012", name: "Cello Gripper", price: "₹10", image: "https://m.media-amazon.com/images/I/61hPjDyZOeL._SX522_.jpg", category: "pens-pencils", colors: ["Blue", "Black", "Red"] },
    { id: "pen-013", name: "Cello Butterflow", price: "₹10", image: "https://m.media-amazon.com/images/I/61tXQjWN4TL._SX522_.jpg", category: "pens-pencils", colors: ["Blue", "Black", "Red"] },
    { id: "pen-014", name: "Flair Silkina", price: "₹10", image: "https://m.media-amazon.com/images/I/61gHzKXGi+L._SX522_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    { id: "pen-015", name: "Hauser XO", price: "₹10", image: "https://m.media-amazon.com/images/I/61NzFJ6F7YL._SX522_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    { id: "pen-016", name: "Hauser XO Glow", price: "₹10", image: "https://m.media-amazon.com/images/I/61NzFJ6F7YL._SX522_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    { id: "pen-017", name: "Hauser C-Thru", price: "₹10", image: "https://m.media-amazon.com/images/I/51qY1Z6LXML._SX522_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    { id: "pen-018", name: "Montex Mega Top", price: "₹10", image: "https://m.media-amazon.com/images/I/71QyHkJ0bJL._SX522_.jpg", category: "pens-pencils", colors: ["Blue", "Black"] },
    { id: "pen-019", name: "Montex SmoothFlow", price: "₹10", image: "https://m.media-amazon.com/images/I/71QyHkJ0bJL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-020", name: "Linc Pentonic", price: "₹10", image: "https://m.media-amazon.com/images/I/61wX7GkKBrL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-021", name: "Win Guide", price: "₹10", image: "https://m.media-amazon.com/images/I/61B0pYZc4XL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-022", name: "UNOMAX Boldtron 2x", price: "₹10", image: "https://m.media-amazon.com/images/I/71xzVJ6LXML._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-023", name: "Montex Impression Gold", price: "₹10", image: "https://m.media-amazon.com/images/I/71QyHkJ0bJL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-024", name: "Montex Gold Touch", price: "₹10", image: "https://m.media-amazon.com/images/I/71QyHkJ0bJL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-025", name: "Montex Copper Touch", price: "₹10", image: "https://m.media-amazon.com/images/I/71QyHkJ0bJL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-026", name: "Montex Silver Touch", price: "₹10", image: "https://m.media-amazon.com/images/I/71QyHkJ0bJL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-027", name: "UNOMAX X-Line", price: "₹10", image: "https://m.media-amazon.com/images/I/61xzVJ6LXML._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-028", name: "Classmate Octane", price: "₹10", image: "https://m.media-amazon.com/images/I/61gPjDyZOeL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-029", name: "Flair Woody", price: "₹10", image: "https://m.media-amazon.com/images/I/61gHzKXGi+L._SX522_.jpg", category: "pens-pencils" },
    
    // ₹10 Gel Pens
    { id: "pen-030", name: "Classmate Octane Gel", price: "₹10", image: "https://m.media-amazon.com/images/I/61gPjDyZOeL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-031", name: "UNOMAX Geltron", price: "₹10", image: "https://m.media-amazon.com/images/I/61xzVJ6LXML._SX522_.jpg", category: "pens-pencils" },
    
    // ₹15 Pens
    { id: "pen-032", name: "Rorito FANTA FLO", price: "₹15", image: "https://m.media-amazon.com/images/I/71m8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    
    // ₹20 Ball Pens
    { id: "pen-033", name: "Cello PaperSoft", price: "₹20", image: "https://m.media-amazon.com/images/I/61KmDnz8YML._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-034", name: "Cello Power", price: "₹20", image: "https://m.media-amazon.com/images/I/61tXQjWN4TL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-035", name: "Hauser Gravity", price: "₹20", image: "https://m.media-amazon.com/images/I/61NzFJ6F7YL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-036", name: "Hauser BENZO", price: "₹20", image: "https://m.media-amazon.com/images/I/51qY1Z6LXML._SX522_.jpg", category: "pens-pencils" },
    
    // ₹20 Gel Pens
    { id: "pen-037", name: "Linc Executive Gel", price: "₹20", image: "https://m.media-amazon.com/images/I/61wX7GkKBrL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-038", name: "Hauser ICONIQ Gel", price: "₹20", image: "https://m.media-amazon.com/images/I/61NzFJ6F7YL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-039", name: "Hauser Float Gel", price: "₹20", image: "https://m.media-amazon.com/images/I/51qY1Z6LXML._SX522_.jpg", category: "pens-pencils" },
    
    // ₹25-80 Premium Pens
    { id: "pen-040", name: "Rorito Jottek Classic", price: "₹25", image: "https://m.media-amazon.com/images/I/71m8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-041", name: "Reynolds Jetter Aerosoft", price: "₹30", image: "https://m.media-amazon.com/images/I/61kVJ6LXML._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-042", name: "Rorito Jottek Feathersoft", price: "₹30", image: "https://m.media-amazon.com/images/I/71m8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-043", name: "Pentel EnerGel", price: "₹40", image: "https://m.media-amazon.com/images/I/71vqWXJEL._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-044", name: "ADDGel ACHIEVER", price: "₹50", image: "https://m.media-amazon.com/images/I/61xzVJ6LXML._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-045", name: "Reynolds TRIMAX", price: "₹60", image: "https://m.media-amazon.com/images/I/61kVJ6LXML._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-046", name: "PILOT Hi-TechPoint O5", price: "₹60", image: "https://m.media-amazon.com/images/I/61qY1Z6LXML._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-047", name: "PILOT Hi-TechPoint V7", price: "₹60", image: "https://m.media-amazon.com/images/I/61qY1Z6LXML._SX522_.jpg", category: "pens-pencils" },
    { id: "pen-048", name: "uni-ball eye fine", price: "₹80", image: "https://m.media-amazon.com/images/I/71E+vqWXJEL._SX522_.jpg", category: "pens-pencils" },
    
    // Pencils
    { id: "pencil-001", name: "Apsara MATTMAGIC 2.0 (Single)", price: "₹7", image: "https://m.media-amazon.com/images/I/61zXJ8LXML._SX522_.jpg", category: "pens-pencils" },
    { id: "pencil-002", name: "Apsara MATTMAGIC 2.0 (Pack of 10)", price: "₹65", image: "https://m.media-amazon.com/images/I/61zXJ8LXML._SX522_.jpg", category: "pens-pencils" },
    { id: "pencil-003", name: "Apsara Platinum (Single)", price: "₹6", image: "https://m.media-amazon.com/images/I/71KmDnz8YML._SX522_.jpg", category: "pens-pencils" },
    { id: "pencil-004", name: "Apsara Platinum (Pack of 10)", price: "₹55", image: "https://m.media-amazon.com/images/I/71KmDnz8YML._SX522_.jpg", category: "pens-pencils" },
    { id: "pencil-005", name: "Natraj 621 (Single)", price: "₹6", image: "https://m.media-amazon.com/images/I/61hPjDyZOeL._SX522_.jpg", category: "pens-pencils" },
    { id: "pencil-006", name: "Natraj 621 (Pack of 10)", price: "₹55", image: "https://m.media-amazon.com/images/I/61hPjDyZOeL._SX522_.jpg", category: "pens-pencils" },
    { id: "pencil-007", name: "DOMS Neon (Single)", price: "₹6", image: "https://m.media-amazon.com/images/I/61W8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    { id: "pencil-008", name: "DOMS Neon (Pack of 10)", price: "₹55", image: "https://m.media-amazon.com/images/I/61W8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    { id: "pencil-009", name: "DOMS X1 (Single)", price: "₹6", image: "https://m.media-amazon.com/images/I/61W8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    { id: "pencil-010", name: "DOMS X1 (Pack of 10)", price: "₹55", image: "https://m.media-amazon.com/images/I/61W8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    { id: "pencil-011", name: "DOMS Zillion (Single)", price: "₹6", image: "https://m.media-amazon.com/images/I/61W8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    { id: "pencil-012", name: "DOMS Zillion (Pack of 10)", price: "₹55", image: "https://m.media-amazon.com/images/I/61W8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    { id: "pencil-013", name: "youVA QUIP (Single)", price: "₹6", image: "https://m.media-amazon.com/images/I/71QyHkJ0bJL._SX522_.jpg", category: "pens-pencils" },
    { id: "pencil-014", name: "youVA QUIP (Pack of 10)", price: "₹55", image: "https://m.media-amazon.com/images/I/71QyHkJ0bJL._SX522_.jpg", category: "pens-pencils" },
    
    // Erasers
    { id: "eraser-001", name: "Apsara Non Dust", price: "₹3", image: "https://m.media-amazon.com/images/I/61zXJ8LXML._SX522_.jpg", category: "pens-pencils" },
    { id: "eraser-002", name: "Apsara Non Dust Long", price: "₹5", image: "https://m.media-amazon.com/images/I/61zXJ8LXML._SX522_.jpg", category: "pens-pencils" },
    { id: "eraser-003", name: "Apsara Disney", price: "₹5", image: "https://m.media-amazon.com/images/I/71KmDnz8YML._SX522_.jpg", category: "pens-pencils" },
    { id: "eraser-004", name: "Apsara Marvel", price: "₹5", image: "https://m.media-amazon.com/images/I/71KmDnz8YML._SX522_.jpg", category: "pens-pencils" },
    { id: "eraser-005", name: "Natraj 621 Plasto", price: "₹18", image: "https://m.media-amazon.com/images/I/61hPjDyZOeL._SX522_.jpg", category: "pens-pencils" },
    { id: "eraser-006", name: "Natraj Smiley", price: "₹20", image: "https://m.media-amazon.com/images/I/61hPjDyZOeL._SX522_.jpg", category: "pens-pencils" },
    { id: "eraser-007", name: "DOMS Eraser", price: "₹3", image: "https://m.media-amazon.com/images/I/61W8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    { id: "eraser-008", name: "DOMS Extra Long", price: "₹5", image: "https://m.media-amazon.com/images/I/61W8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    { id: "eraser-009", name: "DOMS CUBO", price: "₹5", image: "https://m.media-amazon.com/images/I/61W8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    { id: "eraser-010", name: "DOMS E-RACER", price: "₹10", image: "https://m.media-amazon.com/images/I/61W8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    
    // Sharpeners
    { id: "sharpener-001", name: "Apsara Sharpener", price: "₹5", image: "https://m.media-amazon.com/images/I/61zXJ8LXML._SX522_.jpg", category: "pens-pencils" },
    { id: "sharpener-002", name: "Natraj Sharpener", price: "₹5", image: "https://m.media-amazon.com/images/I/61hPjDyZOeL._SX522_.jpg", category: "pens-pencils" },
    { id: "sharpener-003", name: "DOMS Sharpener", price: "₹5", image: "https://m.media-amazon.com/images/I/61W8zKKZqDL._SX522_.jpg", category: "pens-pencils" },
    
    // Scales
    { id: "scale-001", name: "Scale 15cm", price: "₹5", image: "https://m.media-amazon.com/images/I/61KmDnz8YML._SX522_.jpg", category: "pens-pencils" },
    { id: "scale-002", name: "Scale 30cm", price: "₹10", image: "https://m.media-amazon.com/images/I/61KmDnz8YML._SX522_.jpg", category: "pens-pencils" },
    { id: "scale-003", name: "Iron Scale (Small)", price: "₹70", image: "https://m.media-amazon.com/images/I/71QyHkJ0bJL._SX522_.jpg", category: "pens-pencils" },
    { id: "scale-004", name: "Iron Scale (Large)", price: "₹90", image: "https://m.media-amazon.com/images/I/71QyHkJ0bJL._SX522_.jpg", category: "pens-pencils" },
    { id: "scale-005", name: "Wooden Scale", price: "₹15", image: "https://m.media-amazon.com/images/I/61hPjDyZOeL._SX522_.jpg", category: "pens-pencils" },
    { id: "scale-006", name: "Puzzle Scale", price: "₹25", image: "https://m.media-amazon.com/images/I/71KmDnz8YML._SX522_.jpg", category: "pens-pencils" },
  ],
  "notebooks": [
    { id: "nb-001", name: "Single Line Notebook (100 pages)", price: "₹25", image: "/images/products/notebooks/single-100.webp", category: "notebooks" },
    { id: "nb-002", name: "Single Line Notebook (200 pages)", price: "₹45", image: "/images/products/notebooks/single-200.webp", category: "notebooks" },
    { id: "nb-003", name: "Four Line Notebook", price: "₹20", image: "/images/products/notebooks/four-line.webp", category: "notebooks" },
    { id: "nb-004", name: "Interleaf Notebook", price: "₹30", image: "/images/products/notebooks/interleaf.webp", category: "notebooks" },
    { id: "nb-005", name: "Drawing Book (A4)", price: "₹35", image: "/images/products/notebooks/drawing-a4.webp", category: "notebooks" },
    { id: "nb-006", name: "Drawing Book (A3)", price: "₹60", image: "/images/products/notebooks/drawing-a3.webp", category: "notebooks" },
    { id: "nb-007", name: "Graph Notebook", price: "₹30", image: "/images/products/notebooks/graph.webp", category: "notebooks" },
    { id: "nb-008", name: "Lab Notebook - Physics", price: "₹40", image: "/images/products/notebooks/lab-physics.webp", category: "notebooks" },
    { id: "nb-009", name: "Lab Notebook - Chemistry", price: "₹40", image: "/images/products/notebooks/lab-chemistry.webp", category: "notebooks" },
    { id: "nb-010", name: "Register 100 Pages", price: "₹50", image: "/images/products/notebooks/register-100.webp", category: "notebooks" },
    { id: "nb-011", name: "Register 200 Pages", price: "₹90", image: "/images/products/notebooks/register-200.webp", category: "notebooks" },
    { id: "nb-012", name: "Register 500 Pages", price: "₹180", image: "/images/products/notebooks/register-500.webp", category: "notebooks" },
    { id: "nb-013", name: "Long Book (Legal Size)", price: "₹35", image: "/images/products/notebooks/long-book.webp", category: "notebooks" },
    { id: "nb-014", name: "Spiral Notebook A5", price: "₹45", image: "/images/products/notebooks/spiral-a5.webp", category: "notebooks" },
    { id: "nb-015", name: "Spiral Notebook A4", price: "₹65", image: "/images/products/notebooks/spiral-a4.webp", category: "notebooks" },
    { id: "nb-016", name: "Rough Notebook", price: "₹15", image: "/images/products/notebooks/rough.webp", category: "notebooks" },
    { id: "nb-017", name: "Project File with 20 sheets", price: "₹25", image: "/images/products/notebooks/project-file.webp", category: "notebooks" },
    { id: "nb-018", name: "Scrapbook", price: "₹40", image: "/images/products/notebooks/scrapbook.webp", category: "notebooks" },
  ],
  "art-drawing": [
    // Color Pencils
    { id: "art-001", name: "DOMS Color Pencils (12) Small", price: "₹30", image: "/images/products/art-craft/doms-color-12-small.webp", category: "art-drawing" },
    { id: "art-002", name: "DOMS Color Pencils (12) Big", price: "₹60", image: "/images/products/art-craft/doms-color-12-big.webp", category: "art-drawing" },
    { id: "art-003", name: "DOMS Color Pencils (24) Big", price: "₹120", image: "/images/products/art-craft/doms-color-24-big.webp", category: "art-drawing" },
    { id: "art-004", name: "Camlin Color Pencils (12)", price: "₹45", image: "/images/products/art-craft/color-pencils-12.webp", category: "art-drawing" },
    { id: "art-005", name: "Camlin Color Pencils (24)", price: "₹85", image: "/images/products/art-craft/color-pencils-24.webp", category: "art-drawing" },
    
    // Crayons
    { id: "art-006", name: "DOMS Crayons (12)", price: "₹10", image: "/images/products/art-craft/doms-crayons-12.webp", category: "art-drawing" },
    { id: "art-007", name: "DOMS Long Crayons (12)", price: "₹20", image: "/images/products/art-craft/doms-long-crayons-12.webp", category: "art-drawing" },
    { id: "art-008", name: "Apsara Crayons (12)", price: "₹30", image: "/images/products/art-craft/apsara-crayons-12.webp", category: "art-drawing" },
    { id: "art-009", name: "DOMS Oil Pastel", price: "₹50", image: "/images/products/art-craft/doms-oil-pastel.webp", category: "art-drawing" },
    { id: "art-010", name: "Camel Crayons (12)", price: "₹30", image: "/images/products/art-craft/crayons-12.webp", category: "art-drawing" },
    { id: "art-011", name: "Camel Crayons (24)", price: "₹55", image: "/images/products/art-craft/crayons-24.webp", category: "art-drawing" },
    { id: "art-012", name: "Wax Crayons Jumbo", price: "₹40", image: "/images/products/art-craft/wax-jumbo.webp", category: "art-drawing" },
    { id: "art-013", name: "Oil Pastels (12)", price: "₹50", image: "/images/products/art-craft/oil-pastel-12.webp", category: "art-drawing" },
    { id: "art-014", name: "Oil Pastels (24)", price: "₹90", image: "/images/products/art-craft/oil-pastel-24.webp", category: "art-drawing" },
    
    // Painting Colors
    { id: "art-015", name: "DOMS Water Colour Tubes", price: "₹40", image: "/images/products/art-craft/doms-watercolor-tubes.webp", category: "art-drawing" },
    { id: "art-016", name: "DOMS Water Colour Cakes", price: "₹35", image: "/images/products/art-craft/doms-watercolor-cakes.webp", category: "art-drawing" },
    { id: "art-017", name: "Fevicryl Acrylic Colours", price: "₹150", image: "/images/products/art-craft/fevicryl-acrylic.webp", category: "art-drawing" },
    { id: "art-018", name: "Water Colors (12)", price: "₹35", image: "/images/products/art-craft/watercolor-12.webp", category: "art-drawing" },
    { id: "art-019", name: "Poster Colors (6)", price: "₹60", image: "/images/products/art-craft/poster-6.webp", category: "art-drawing" },
    { id: "art-020", name: "Acrylic Colors Set", price: "₹150", image: "/images/products/art-craft/acrylic-set.webp", category: "art-drawing" },
    
    // Art Supplies
    { id: "art-021", name: "Paint Brushes (Set of 7)", price: "₹45", image: "/images/products/art-craft/brushes-set.webp", category: "art-drawing" },
    { id: "art-022", name: "Color Mixing Palette", price: "₹20", image: "/images/products/art-craft/palette.webp", category: "art-drawing" },
    { id: "art-023", name: "Canvas Board (Small)", price: "₹40", image: "/images/products/art-craft/canvas-small.webp", category: "art-drawing" },
    { id: "art-024", name: "Canvas Board (Medium)", price: "₹70", image: "/images/products/art-craft/canvas-medium.webp", category: "art-drawing" },
    { id: "art-025", name: "Craft Paper (Pack of 20)", price: "₹30", image: "/images/products/art-craft/craft-paper.webp", category: "art-drawing" },
    { id: "art-026", name: "Glitter Sheets (10 colors)", price: "₹50", image: "/images/products/art-craft/glitter-sheets.webp", category: "art-drawing" },
    { id: "art-027", name: "Chart Paper (Pack of 5)", price: "₹25", image: "/images/products/art-craft/chart-paper.webp", category: "art-drawing" },
    { id: "art-028", name: "Origami Paper (100 sheets)", price: "₹35", image: "/images/products/art-craft/origami.webp", category: "art-drawing" },
    { id: "art-029", name: "Craft Scissors (Decorative)", price: "₹60", image: "/images/products/art-craft/craft-scissors.webp", category: "art-drawing" },
  ],
  "school-essentials": [
    { id: "sch-001", name: "School Bag (Small)", price: "₹350", image: "/images/products/school-supplies/bag-small.webp", category: "school-essentials" },
    { id: "sch-002", name: "School Bag (Large)", price: "₹550", image: "/images/products/school-supplies/bag-large.webp", category: "school-essentials" },
    { id: "sch-003", name: "Trolley Bag", price: "₹800", image: "/images/products/school-supplies/trolley-bag.webp", category: "school-essentials" },
    { id: "sch-004", name: "Lunch Box (Steel)", price: "₹180", image: "/images/products/school-supplies/lunchbox-steel.webp", category: "school-essentials" },
    { id: "sch-005", name: "Lunch Box (Plastic)", price: "₹100", image: "/images/products/school-supplies/lunchbox-plastic.webp", category: "school-essentials" },
    { id: "sch-006", name: "Water Bottle 500ml", price: "₹80", image: "/images/products/school-supplies/bottle-500.webp", category: "school-essentials" },
    { id: "sch-007", name: "Water Bottle 750ml", price: "₹120", image: "/images/products/school-supplies/bottle-750.webp", category: "school-essentials" },
    { id: "sch-008", name: "Eraser - Apsara Non-Dust", price: "₹5", image: "/images/products/school-supplies/eraser-apsara.webp", category: "school-essentials" },
    { id: "sch-009", name: "Eraser - Natraj", price: "₹3", image: "/images/products/school-supplies/eraser-natraj.webp", category: "school-essentials" },
    { id: "sch-010", name: "Sharpener - Single Hole", price: "₹5", image: "/images/products/school-supplies/sharpener-single.webp", category: "school-essentials" },
    { id: "sch-011", name: "Sharpener - Double Hole", price: "₹10", image: "/images/products/school-supplies/sharpener-double.webp", category: "school-essentials" },
    { id: "sch-012", name: "Pencil Box (Plastic)", price: "₹50", image: "/images/products/school-supplies/pencilbox-plastic.webp", category: "school-essentials" },
    { id: "sch-013", name: "Pencil Box (Metal)", price: "₹80", image: "/images/products/school-supplies/pencilbox-metal.webp", category: "school-essentials" },
    { id: "sch-014", name: "Pouch (Fabric)", price: "₹60", image: "/images/products/school-supplies/pouch.webp", category: "school-essentials" },
    { id: "sch-015", name: "Name Labels (Pack of 20)", price: "₹20", image: "/images/products/school-supplies/name-labels.webp", category: "school-essentials" },
    { id: "sch-016", name: "Book Covers (5 pack)", price: "₹25", image: "/images/products/school-supplies/book-covers.webp", category: "school-essentials" },
    { id: "sch-017", name: "Umbrella (Kids)", price: "₹150", image: "/images/products/school-supplies/umbrella.webp", category: "school-essentials" },
    { id: "sch-018", name: "Raincoat (Kids)", price: "₹200", image: "/images/products/school-supplies/raincoat.webp", category: "school-essentials" },
    { id: "sch-019", name: "Exam Board (Wooden)", price: "₹80", image: "/images/products/school-supplies/exam-board.webp", category: "school-essentials" },
    { id: "sch-020", name: "Exam Pad (Plastic)", price: "₹50", image: "/images/products/school-supplies/exam-pad.webp", category: "school-essentials" },
    { id: "sch-021", name: "Homework Bag", price: "₹120", image: "/images/products/school-supplies/homework-bag.webp", category: "school-essentials" },
    { id: "sch-022", name: "School Diary", price: "₹40", image: "/images/products/school-supplies/school-diary.webp", category: "school-essentials" },
  ],
  "geometry": [
    { id: "geo-001", name: "Geometry Box - Camlin", price: "₹75", image: "/images/products/geometry/box-camlin.webp", category: "geometry" },
    { id: "geo-002", name: "Geometry Box - Doms", price: "₹65", image: "/images/products/geometry/box-doms.webp", category: "geometry" },
    { id: "geo-003", name: "Geometry Box - Premium", price: "₹120", image: "/images/products/geometry/box-premium.webp", category: "geometry" },
    { id: "geo-004", name: "15cm Scale (Plastic)", price: "₹10", image: "/images/products/geometry/scale-15.webp", category: "geometry" },
    { id: "geo-005", name: "30cm Scale (Plastic)", price: "₹15", image: "/images/products/geometry/scale-30.webp", category: "geometry" },
    { id: "geo-006", name: "Steel Ruler 30cm", price: "₹40", image: "/images/products/geometry/steel-ruler.webp", category: "geometry" },
    { id: "geo-007", name: "Compass with Pencil", price: "₹25", image: "/images/products/geometry/compass-pencil.webp", category: "geometry" },
    { id: "geo-008", name: "Compass (Metal)", price: "₹45", image: "/images/products/geometry/compass-metal.webp", category: "geometry" },
    { id: "geo-009", name: "Protractor 180°", price: "₹15", image: "/images/products/geometry/protractor.webp", category: "geometry" },
    { id: "geo-010", name: "Set Squares (Pair)", price: "₹30", image: "/images/products/geometry/set-squares.webp", category: "geometry" },
    { id: "geo-011", name: "Graph Paper (Pack of 20)", price: "₹25", image: "/images/products/geometry/graph-paper.webp", category: "geometry" },
    { id: "geo-012", name: "Divider", price: "₹35", image: "/images/products/geometry/divider.webp", category: "geometry" },
  ],
  "office-supplies": [
    { id: "off-001", name: "A4 Paper Ream (500 sheets)", price: "₹280", image: "/images/products/office-supplies/a4-ream.webp", category: "office-supplies" },
    { id: "off-002", name: "A4 Paper (100 sheets)", price: "₹65", image: "/images/products/office-supplies/a4-100.webp", category: "office-supplies" },
    { id: "off-003", name: "Legal Paper (100 sheets)", price: "₹75", image: "/images/products/office-supplies/legal-paper.webp", category: "office-supplies" },
    { id: "off-004", name: "File Folder (Plastic)", price: "₹25", image: "/images/products/office-supplies/folder-plastic.webp", category: "office-supplies" },
    { id: "off-005", name: "File Folder (Cardboard)", price: "₹15", image: "/images/products/office-supplies/folder-cardboard.webp", category: "office-supplies" },
    { id: "off-006", name: "Box File", price: "₹80", image: "/images/products/office-supplies/box-file.webp", category: "office-supplies" },
    { id: "off-007", name: "Ring Binder File", price: "₹90", image: "/images/products/office-supplies/ring-binder.webp", category: "office-supplies" },
    { id: "off-008", name: "Stapler (Medium)", price: "₹60", image: "/images/products/office-supplies/stapler-medium.webp", category: "office-supplies" },
    { id: "off-009", name: "Stapler (Heavy Duty)", price: "₹150", image: "/images/products/office-supplies/stapler-heavy.webp", category: "office-supplies" },
    { id: "off-010", name: "Stapler Pins (Box)", price: "₹20", image: "/images/products/office-supplies/stapler-pins.webp", category: "office-supplies" },
    { id: "off-011", name: "Paper Clips (Box)", price: "₹15", image: "/images/products/office-supplies/paper-clips.webp", category: "office-supplies" },
    { id: "off-012", name: "Binder Clips (Pack)", price: "₹25", image: "/images/products/office-supplies/binder-clips.webp", category: "office-supplies" },
    { id: "off-013", name: "Sticky Notes (3x3)", price: "₹35", image: "/images/products/office-supplies/sticky-3x3.webp", category: "office-supplies" },
    { id: "off-014", name: "Sticky Notes (Assorted)", price: "₹50", image: "/images/products/office-supplies/sticky-assorted.webp", category: "office-supplies" },
    { id: "off-015", name: "Tape Dispenser", price: "₹45", image: "/images/products/office-supplies/tape-dispenser.webp", category: "office-supplies" },
    { id: "off-016", name: "Transparent Tape Roll", price: "₹20", image: "/images/products/office-supplies/tape-roll.webp", category: "office-supplies" },
  ],
};

// Gift items for the Gifts page
export const giftItems: ProductItem[] = [
  { id: "gift-001", name: "Premium Pen Gift Set", price: "₹250 - ₹500", image: "/images/gifts/pen-gift-set.webp", category: "gifts", description: "Elegant pen sets for gifting" },
  { id: "gift-002", name: "Diary & Pen Combo", price: "₹150 - ₹350", image: "/images/gifts/diary-pen-combo.webp", category: "gifts", description: "Perfect for professionals" },
  { id: "gift-003", name: "Art Kit for Kids", price: "₹200 - ₹600", image: "/images/gifts/art-kit-kids.webp", category: "gifts", description: "Complete art set for creative kids" },
  { id: "gift-004", name: "School Starter Kit", price: "₹300 - ₹500", image: "/images/gifts/school-kit.webp", category: "gifts", description: "Everything for new school year" },
  { id: "gift-005", name: "Executive Desk Set", price: "₹400 - ₹800", image: "/images/gifts/desk-set.webp", category: "gifts", description: "For office professionals" },
  { id: "gift-006", name: "Birthday Return Gift Pack", price: "₹30 - ₹100", image: "/images/gifts/return-gift.webp", category: "gifts", description: "Bulk available for parties" },
  { id: "gift-007", name: "Crayon & Color Set", price: "₹100 - ₹300", image: "/images/gifts/crayon-set.webp", category: "gifts", description: "For young artists" },
  { id: "gift-008", name: "Exam Success Kit", price: "₹150 - ₹250", image: "/images/gifts/exam-kit.webp", category: "gifts", description: "All exam essentials" },
  { id: "gift-009", name: "Custom Gift Hamper", price: "₹200 - ₹1000", image: "/images/gifts/custom-hamper.webp", category: "gifts", description: "Customized to your needs" },
  { id: "gift-010", name: "Teacher's Day Gift Set", price: "₹150 - ₹400", image: "/images/gifts/teachers-day.webp", category: "gifts", description: "Special for teachers" },
];

// Gift Categories
export interface GiftCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export const giftCategories: GiftCategory[] = [
  {
    id: "return-gifts",
    name: "Return Gifts",
    slug: "return-gifts",
    description: "Perfect for birthday parties & celebrations",
    image: "/images/gifts/return-gift.webp",
    itemCount: 12,
  },
  {
    id: "kids-gifts",
    name: "Kids Gift Sets",
    slug: "kids-gifts",
    description: "Fun & creative gifts for children",
    image: "/images/gifts/art-kit-kids.webp",
    itemCount: 10,
  },
  {
    id: "corporate-gifts",
    name: "Corporate & Office Gifts",
    slug: "corporate-gifts",
    description: "Professional gifts for colleagues & clients",
    image: "/images/gifts/desk-set.webp",
    itemCount: 8,
  },
  {
    id: "occasion-gifts",
    name: "Occasion Special",
    slug: "occasion-gifts",
    description: "Teacher's Day, Diwali, New Year & more",
    image: "/images/gifts/teachers-day.webp",
    itemCount: 10,
  },
];

// Gift items organized by category
export const giftItemsByCategory: Record<string, ProductItem[]> = {
  "return-gifts": [
    { id: "rg-001", name: "Pencil Box Gift Pack", price: "₹30", image: "/images/gifts/pencil-box-pack.webp", category: "return-gifts", description: "Colorful pencil boxes" },
    { id: "rg-002", name: "Mini Stationery Set", price: "₹40", image: "/images/gifts/mini-stationery.webp", category: "return-gifts", description: "Pencil, eraser, sharpener combo" },
    { id: "rg-003", name: "Cartoon Pencil Pack", price: "₹25", image: "/images/gifts/cartoon-pencil.webp", category: "return-gifts", description: "Fun character pencils" },
    { id: "rg-004", name: "Eraser Collection Set", price: "₹35", image: "/images/gifts/eraser-set.webp", category: "return-gifts", description: "Cute shaped erasers" },
    { id: "rg-005", name: "Mini Notebook Pack", price: "₹20", image: "/images/gifts/mini-notebook.webp", category: "return-gifts", description: "Small notebooks with designs" },
    { id: "rg-006", name: "Crayon Mini Pack (6 colors)", price: "₹25", image: "/images/gifts/crayon-mini.webp", category: "return-gifts", description: "Perfect party favor" },
    { id: "rg-007", name: "Sticker Sheet Pack", price: "₹15", image: "/images/gifts/sticker-pack.webp", category: "return-gifts", description: "Kids love stickers!" },
    { id: "rg-008", name: "Fancy Pen Gift", price: "₹30", image: "/images/gifts/fancy-pen.webp", category: "return-gifts", description: "Glitter & sparkle pens" },
    { id: "rg-009", name: "Puzzle Book Mini", price: "₹35", image: "/images/gifts/puzzle-book.webp", category: "return-gifts", description: "Activity books" },
    { id: "rg-010", name: "Color Pen Set (5 colors)", price: "₹40", image: "/images/gifts/color-pen-set.webp", category: "return-gifts", description: "Bright color pens" },
    { id: "rg-011", name: "Pouch & Pen Combo", price: "₹50", image: "/images/gifts/pouch-pen.webp", category: "return-gifts", description: "Small pouch with pen" },
    { id: "rg-012", name: "Return Gift Combo Box", price: "₹60", image: "/images/gifts/combo-box.webp", category: "return-gifts", description: "Complete gift pack" },
  ],
  "kids-gifts": [
    { id: "kg-001", name: "Art Kit for Kids", price: "₹200", image: "/images/gifts/art-kit-kids.webp", category: "kids-gifts", description: "Complete art set" },
    { id: "kg-002", name: "Crayon & Color Set (64 pc)", price: "₹150", image: "/images/gifts/crayon-set.webp", category: "kids-gifts", description: "All colors included" },
    { id: "kg-003", name: "Drawing Kit Premium", price: "₹300", image: "/images/gifts/drawing-kit.webp", category: "kids-gifts", description: "For budding artists" },
    { id: "kg-004", name: "School Starter Kit", price: "₹350", image: "/images/gifts/school-kit.webp", category: "kids-gifts", description: "New school essentials" },
    { id: "kg-005", name: "Color Pencil Set (24 shades)", price: "₹120", image: "/images/gifts/color-pencil-24.webp", category: "kids-gifts", description: "Premium quality" },
    { id: "kg-006", name: "Sketch Pen Kit (36 colors)", price: "₹180", image: "/images/gifts/sketch-pen-kit.webp", category: "kids-gifts", description: "Vibrant colors" },
    { id: "kg-007", name: "Paint Set with Brushes", price: "₹250", image: "/images/gifts/paint-set.webp", category: "kids-gifts", description: "Water colors included" },
    { id: "kg-008", name: "Craft Kit Deluxe", price: "₹400", image: "/images/gifts/craft-kit.webp", category: "kids-gifts", description: "Papers, scissors, glue & more" },
    { id: "kg-009", name: "Stationery Box Premium", price: "₹280", image: "/images/gifts/stationery-box.webp", category: "kids-gifts", description: "Multi-compartment box" },
    { id: "kg-010", name: "Activity & Learning Kit", price: "₹350", image: "/images/gifts/activity-kit.webp", category: "kids-gifts", description: "Fun learning tools" },
  ],
  "corporate-gifts": [
    { id: "cg-001", name: "Executive Desk Set", price: "₹500", image: "/images/gifts/desk-set.webp", category: "corporate-gifts", description: "Professional look" },
    { id: "cg-002", name: "Premium Pen Gift Set", price: "₹350", image: "/images/gifts/pen-gift-set.webp", category: "corporate-gifts", description: "Elegant pen sets" },
    { id: "cg-003", name: "Diary & Pen Combo", price: "₹250", image: "/images/gifts/diary-pen-combo.webp", category: "corporate-gifts", description: "Perfect for meetings" },
    { id: "cg-004", name: "Leather Diary Premium", price: "₹400", image: "/images/gifts/leather-diary.webp", category: "corporate-gifts", description: "Executive diary" },
    { id: "cg-005", name: "Parker Pen Set", price: "₹600", image: "/images/gifts/parker-set.webp", category: "corporate-gifts", description: "Classic choice" },
    { id: "cg-006", name: "Desktop Organizer Set", price: "₹450", image: "/images/gifts/desktop-organizer.webp", category: "corporate-gifts", description: "Keep desk tidy" },
    { id: "cg-007", name: "Memo Pad & Pen Combo", price: "₹200", image: "/images/gifts/memo-pen.webp", category: "corporate-gifts", description: "Quick notes set" },
    { id: "cg-008", name: "Business Card Holder Set", price: "₹300", image: "/images/gifts/card-holder.webp", category: "corporate-gifts", description: "With pen stand" },
  ],
  "occasion-gifts": [
    { id: "og-001", name: "Teacher's Day Gift Set", price: "₹200", image: "/images/gifts/teachers-day.webp", category: "occasion-gifts", description: "Show appreciation" },
    { id: "og-002", name: "Diwali Gift Hamper", price: "₹350", image: "/images/gifts/diwali-hamper.webp", category: "occasion-gifts", description: "Festive special" },
    { id: "og-003", name: "New Year Diary Set", price: "₹300", image: "/images/gifts/new-year-diary.webp", category: "occasion-gifts", description: "Fresh start gift" },
    { id: "og-004", name: "Rakhi Gift Pack", price: "₹180", image: "/images/gifts/rakhi-pack.webp", category: "occasion-gifts", description: "For siblings" },
    { id: "og-005", name: "Exam Success Kit", price: "₹200", image: "/images/gifts/exam-kit.webp", category: "occasion-gifts", description: "Good luck gift" },
    { id: "og-006", name: "Graduation Gift Set", price: "₹400", image: "/images/gifts/graduation-set.webp", category: "occasion-gifts", description: "Achievement reward" },
    { id: "og-007", name: "Children's Day Pack", price: "₹150", image: "/images/gifts/childrens-day.webp", category: "occasion-gifts", description: "Fun stationery" },
    { id: "og-008", name: "Custom Gift Hamper", price: "₹500", image: "/images/gifts/custom-hamper.webp", category: "occasion-gifts", description: "Your choice items" },
    { id: "og-009", name: "Thank You Gift Box", price: "₹250", image: "/images/gifts/thank-you-box.webp", category: "occasion-gifts", description: "Express gratitude" },
    { id: "og-010", name: "Festival Combo Pack", price: "₹300", image: "/images/gifts/festival-combo.webp", category: "occasion-gifts", description: "Multi-occasion" },
  ],
};

// Get gift items by category slug
export function getGiftsByCategory(slug: string): ProductItem[] {
  return giftItemsByCategory[slug] || [];
}

// Get gift category by slug
export function getGiftCategoryBySlug(slug: string): GiftCategory | undefined {
  return giftCategories.find((cat) => cat.slug === slug);
}

// Get products by category slug
export function getProductsByCategory(slug: string): ProductItem[] {
  return productItems[slug] || [];
}

// Get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

// Placeholder image
export const PLACEHOLDER_IMAGE = "/images/placeholders/product-placeholder.webp";
