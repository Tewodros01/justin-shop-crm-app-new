export type StoreUser = {
  id?: string | null; // Supabase Auth user ID (UUID format)
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null; // Optional
  role?: 'owner' | 'manager' | 'staff'; // Role-based access
  password?: string; // Make sure it's always a string
  store_id?: number | null; // Nullable if not assigned to a store
  created_at?: string | null; // Timestamp
  updated_at?: string | null; // Timestamp
};
