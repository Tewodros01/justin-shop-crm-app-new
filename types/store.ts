export interface Store {
  id?: number | null;
  store_name?: string | null;
  store_email?: string | null;
  store_phone?: string | null;
  store_address?: string | null;
  postal_code?: string | null;
  province?: string | null;
  cover_image?: string | null;
  additional_images?: Record<string, any>[];
  free_shipping_threshold?: number;
  store_hours?: string | null;
  photo_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface StoreCategory {
  id?: number | null;
  created_at?: string | null;
  category_name?: string | null;
  parent_category_id?: number | null;
  store_description?: string | null;
  store_image?: string | null;
  store_slug?: string | null;
  store_status?: string | null;
  store_seo_title?: string | null;
  store_seo_keywords?: string | null;
}
