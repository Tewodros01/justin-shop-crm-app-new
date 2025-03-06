export interface StoreCategory {
  id: number;
  category_name: string;
}

export interface Store {
  id: number;
  store_name: string;
  store_email: string;
  store_phone: string;
  store_address: string;
  postal_code: string;
  province: string;
  cover_image?: string | null;
  additional_images?: Record<string, any> | null; // JSON object
  free_shipping_threshold?: number | null;
  store_hours?: string | null;
  created_at: string;
  updated_at?: string | null;
  store_category_id: number;
  photo_url?: string | null;
  store_category?: StoreCategory | null; // Store category relation
}
