export interface Booking {
  id: number;
  qr_code: string;
  product_id: number;
  user_id: string;
  booking_size: string;
  booking_status: string;
  expiration_time: string | null;
  billing_name: string;
  billing_email: string;
  billing_phone: string;
  shipping_city: string;
  shipping_province: string;
  shipping_postal_code: string;
  shipping_state: string;
  shipping_notes: string | null;
  created_at: string;
  updated_at: string | null;
  product?: {
    id: number;
    name: string;
    price: number;
  } | null;
  user?: {
    id: string;
    email: string;
  } | null;
}

export interface BookingListingResponse {
  success: boolean;
  time: string;
  message: string;
  total_bookings: number;
  offset: number;
  limit: number;
  bookings: Booking[];
}
