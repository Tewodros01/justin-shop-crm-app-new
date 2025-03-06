export interface ProductCategory {
  id: number;
  category_name: string;
  category_slug: string;
}

export interface Product {
  id: number;
  product_name: string;
  barcode: string;
  price: number;
  discounted_price?: number | null;
  created_at: string;
  is_discount?: boolean | null;
  unit_price?: number | null;
  quantity?: number | null;
  total_price?: number | null;
  category_id: number;
  brand?: string | null;
  color?: string | null;
  product_description?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  photo_url?: string | null;
  product_categories?: ProductCategory | null; // Fix: Ensure a single object
}
