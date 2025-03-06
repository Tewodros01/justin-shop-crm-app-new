export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: 'owner' | 'manager' | 'staff'; // Restricting roles to known values
  store_id: number | null;
  created_at: string;
};

export type UserResponse = {
  success: boolean;
  time: string;
  message: string;
  total_users: number;
  offset: number;
  limit: number;
  users: User[];
};
