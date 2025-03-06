export interface Coupon {
  id: number;
  coupon_code: string;
  discount_amount: number;
  coupon_status: 'active' | 'used' | 'expired';
  expiration_date?: string | null;
  created_at: string;
  updated_at?: string | null;
}
