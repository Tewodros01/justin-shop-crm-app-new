export interface Order {
  id: number;
  created_at: string;
  order_code: string;
  user_id: string;
  order_status: string;
  order_date: string | null;
  subtotal: number;
  shipping_fee: number;
  discount: number;
  total_amount: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  city: string;
  postal_code: string;
  street_address: string;
  user?: {
    id: string;
    email: string;
  } | null;
}

export interface OrderListingResponse {
  success: boolean;
  time: string;
  message: string;
  total_orders: number;
  offset: number;
  limit: number;
  orders: Order[];
}
