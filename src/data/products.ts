export interface ProductItem {
  id: string;
  name: string;
  price: string;
  description?: string;
  image: string;
  category: string;
  inStock?: boolean;
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
    itemCount: 24,
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
    itemCount: 20,
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
    { id: "pen-001", name: "Cello Pinpoint Ball Pen (Blue)", price: "₹10", image: "/images/products/pens/ballpen-blue.webp", category: "pens-pencils" },
    { id: "pen-002", name: "Cello Pinpoint Ball Pen (Black)", price: "₹10", image: "/images/products/pens/ballpen-black.webp", category: "pens-pencils" },
    { id: "pen-003", name: "Reynolds 045 Fine (Blue)", price: "₹8", image: "/images/products/pens/reynolds-blue.webp", category: "pens-pencils" },
    { id: "pen-004", name: "Reynolds 045 Fine (Black)", price: "₹8", image: "/images/products/pens/reynolds-black.webp", category: "pens-pencils" },
    { id: "pen-005", name: "Gel Pen - Pilot V5", price: "₹40", image: "/images/products/pens/gel-pilot.webp", category: "pens-pencils" },
    { id: "pen-006", name: "Gel Pen - Cello Geltech", price: "₹20", image: "/images/products/pens/gel-cello.webp", category: "pens-pencils" },
    { id: "pen-007", name: "Natraj Pencil HB (Pack of 10)", price: "₹30", image: "/images/products/pens/natraj-pencil.webp", category: "pens-pencils" },
    { id: "pen-008", name: "Apsara Pencil (Pack of 10)", price: "₹35", image: "/images/products/pens/apsara-pencil.webp", category: "pens-pencils" },
    { id: "pen-009", name: "Mechanical Pencil 0.5mm", price: "₹25", image: "/images/products/pens/mechanical-pencil.webp", category: "pens-pencils" },
    { id: "pen-010", name: "Mechanical Pencil 0.7mm", price: "₹30", image: "/images/products/pens/mechanical-07.webp", category: "pens-pencils" },
    { id: "pen-011", name: "Sketch Pens (12 colors)", price: "₹40", image: "/images/products/pens/sketch-12.webp", category: "pens-pencils" },
    { id: "pen-012", name: "Sketch Pens (24 colors)", price: "₹75", image: "/images/products/pens/sketch-24.webp", category: "pens-pencils" },
    { id: "pen-013", name: "Highlighter Set (5 colors)", price: "₹60", image: "/images/products/pens/highlighter-set.webp", category: "pens-pencils" },
    { id: "pen-014", name: "Highlighter Single", price: "₹15", image: "/images/products/pens/highlighter-single.webp", category: "pens-pencils" },
    { id: "pen-015", name: "Permanent Marker (Black)", price: "₹25", image: "/images/products/pens/marker-black.webp", category: "pens-pencils" },
    { id: "pen-016", name: "Whiteboard Marker Set", price: "₹80", image: "/images/products/pens/whiteboard-marker.webp", category: "pens-pencils" },
    { id: "pen-017", name: "Fountain Pen - Hero", price: "₹50", image: "/images/products/pens/fountain-hero.webp", category: "pens-pencils" },
    { id: "pen-018", name: "Fountain Pen - Parker", price: "₹150", image: "/images/products/pens/fountain-parker.webp", category: "pens-pencils" },
    { id: "pen-019", name: "Ink Bottle - Blue", price: "₹20", image: "/images/products/pens/ink-blue.webp", category: "pens-pencils" },
    { id: "pen-020", name: "Ink Bottle - Black", price: "₹20", image: "/images/products/pens/ink-black.webp", category: "pens-pencils" },
    { id: "pen-021", name: "Lead Refills 0.5mm (Pack)", price: "₹15", image: "/images/products/pens/lead-refill.webp", category: "pens-pencils" },
    { id: "pen-022", name: "Pen Stand - Plastic", price: "₹35", image: "/images/products/pens/pen-stand.webp", category: "pens-pencils" },
    { id: "pen-023", name: "Pen Gift Set", price: "₹120", image: "/images/products/pens/pen-gift-set.webp", category: "pens-pencils" },
    { id: "pen-024", name: "Multi-color Pen (4 in 1)", price: "₹30", image: "/images/products/pens/multicolor-pen.webp", category: "pens-pencils" },
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
    { id: "art-001", name: "Camlin Color Pencils (12)", price: "₹45", image: "/images/products/art-craft/color-pencils-12.webp", category: "art-drawing" },
    { id: "art-002", name: "Camlin Color Pencils (24)", price: "₹85", image: "/images/products/art-craft/color-pencils-24.webp", category: "art-drawing" },
    { id: "art-003", name: "Doms Color Pencils (12)", price: "₹40", image: "/images/products/art-craft/doms-color-12.webp", category: "art-drawing" },
    { id: "art-004", name: "Crayons - Camel (12)", price: "₹30", image: "/images/products/art-craft/crayons-12.webp", category: "art-drawing" },
    { id: "art-005", name: "Crayons - Camel (24)", price: "₹55", image: "/images/products/art-craft/crayons-24.webp", category: "art-drawing" },
    { id: "art-006", name: "Wax Crayons Jumbo", price: "₹40", image: "/images/products/art-craft/wax-jumbo.webp", category: "art-drawing" },
    { id: "art-007", name: "Oil Pastels (12)", price: "₹50", image: "/images/products/art-craft/oil-pastel-12.webp", category: "art-drawing" },
    { id: "art-008", name: "Oil Pastels (24)", price: "₹90", image: "/images/products/art-craft/oil-pastel-24.webp", category: "art-drawing" },
    { id: "art-009", name: "Water Colors (12)", price: "₹35", image: "/images/products/art-craft/watercolor-12.webp", category: "art-drawing" },
    { id: "art-010", name: "Poster Colors (6)", price: "₹60", image: "/images/products/art-craft/poster-6.webp", category: "art-drawing" },
    { id: "art-011", name: "Acrylic Colors Set", price: "₹150", image: "/images/products/art-craft/acrylic-set.webp", category: "art-drawing" },
    { id: "art-012", name: "Paint Brushes (Set of 7)", price: "₹45", image: "/images/products/art-craft/brushes-set.webp", category: "art-drawing" },
    { id: "art-013", name: "Color Mixing Palette", price: "₹20", image: "/images/products/art-craft/palette.webp", category: "art-drawing" },
    { id: "art-014", name: "Canvas Board (Small)", price: "₹40", image: "/images/products/art-craft/canvas-small.webp", category: "art-drawing" },
    { id: "art-015", name: "Canvas Board (Medium)", price: "₹70", image: "/images/products/art-craft/canvas-medium.webp", category: "art-drawing" },
    { id: "art-016", name: "Craft Paper (Pack of 20)", price: "₹30", image: "/images/products/art-craft/craft-paper.webp", category: "art-drawing" },
    { id: "art-017", name: "Glitter Sheets (10 colors)", price: "₹50", image: "/images/products/art-craft/glitter-sheets.webp", category: "art-drawing" },
    { id: "art-018", name: "Chart Paper (Pack of 5)", price: "₹25", image: "/images/products/art-craft/chart-paper.webp", category: "art-drawing" },
    { id: "art-019", name: "Origami Paper (100 sheets)", price: "₹35", image: "/images/products/art-craft/origami.webp", category: "art-drawing" },
    { id: "art-020", name: "Craft Scissors (Decorative)", price: "₹60", image: "/images/products/art-craft/craft-scissors.webp", category: "art-drawing" },
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
