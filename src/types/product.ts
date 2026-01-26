export interface Product {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  items: string[];
  imagePath: string;
  imageAlt: string;
  category: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  imagePath: string;
}
