// Product type interface
export interface Product {
  id?: number | null;
  product_name?: string | null;
  barcode?: string | null;
  price?: number | null;
  discounted_price?: number | null;
  created_at?: string | null;
  is_discount?: boolean | null;
  unit_price?: number | null;
  quantity?: number | null;
  total_price?: number | null;
  category_id?: number | null;
  subcategory?: number | null;
  brand?: string | null;
  color?: string | null;
  size_available?: Record<string, any> | null;
  model_size?: string | null;
  model_height?: string | null;
  fit?: string | null;
  gender?: string | null;
  inventory_status?: string | null;
  customizable?: boolean | null;
  product_description?: string;
  auto_completion?: boolean;
  reservations?: boolean;
  coupons_applied?: Record<string, any>;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
}

// Category type interface
export interface Category {
  id?: number;
  category_name?: string | null;
  parent_category_id?: number | null;
  category_type?: string | null;
  category_description?: string | null;
  category_image_url?: string | null;
  category_slug?: string | null;
  category_status?: string | null;
  category_display_order?: number | null;
  category_seo_title?: string | null;
  category_seo_description?: string | null;
  category_seo_keywords?: string | null;
  created_at?: string | null;
}
