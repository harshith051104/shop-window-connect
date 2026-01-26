import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "notebooks",
    title: "Notebooks & Registers",
    description: "All sizes for school, college & office",
    priceRange: "₹15 - ₹200",
    items: [
      "Single line notebooks",
      "Registers (100-500 pages)",
      "Drawing books",
      "Lab notebooks",
    ],
    imagePath: "/images/products/notebooks/featured.webp",
    imageAlt: "Notebooks and Registers",
    category: "notebooks",
  },
  {
    id: "pens",
    title: "Pens & Pencils",
    description: "Quality writing instruments",
    priceRange: "₹5 - ₹150",
    items: [
      "Ball pens (Cello, Reynolds)",
      "Gel pens",
      "Pencils & mechanical pencils",
      "Sketch pens & markers",
    ],
    imagePath: "/images/products/pens/featured.webp",
    imageAlt: "Pens and Pencils",
    category: "pens",
  },
  {
    id: "geometry",
    title: "Geometry & Math",
    description: "Complete geometry sets",
    priceRange: "₹20 - ₹250",
    items: [
      "Geometry boxes",
      "Rulers & scales",
      "Compass sets",
      "Graph papers",
    ],
    imagePath: "/images/products/geometry/featured.webp",
    imageAlt: "Geometry and Math Tools",
    category: "geometry",
  },
  {
    id: "school-supplies",
    title: "School Supplies",
    description: "Everything for students",
    priceRange: "₹10 - ₹500",
    items: [
      "School bags",
      "Lunch boxes",
      "Water bottles",
      "Erasers & sharpeners",
    ],
    imagePath: "/images/products/school-supplies/featured.webp",
    imageAlt: "School Supplies",
    category: "school-supplies",
  },
  {
    id: "office-supplies",
    title: "Office Supplies",
    description: "For your workspace needs",
    priceRange: "₹15 - ₹300",
    items: [
      "Files & folders",
      "Staplers & pins",
      "Sticky notes",
      "Printing paper (A4)",
    ],
    imagePath: "/images/products/office-supplies/featured.webp",
    imageAlt: "Office Supplies",
    category: "office-supplies",
  },
  {
    id: "art-craft",
    title: "Art & Craft",
    description: "Unleash creativity",
    priceRange: "₹20 - ₹400",
    items: [
      "Color pencils & crayons",
      "Craft paper",
      "Glue & scissors",
      "Chart papers",
    ],
    imagePath: "/images/products/art-craft/featured.webp",
    imageAlt: "Art and Craft Supplies",
    category: "art-craft",
  },
];

// Placeholder image for missing images
export const PLACEHOLDER_IMAGE = "/images/placeholders/product-placeholder.webp";
