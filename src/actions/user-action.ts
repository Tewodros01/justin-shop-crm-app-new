'use server';

import { User, UserResponse } from 'types/user';
import { createClient } from 'utils/supabase/server';
import { supabaseAdmin } from 'utils/supabase/supabase-admin';

// Create a new store user
export const createUser = async ({
  first_name,
  last_name,
  email,
  password,
  phone,
  role,
  store_id
}: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  role: 'owner' | 'manager' | 'staff';
  store_id: string;
}) => {
  const supabase = await createClient();

  try {
    // Step 1: Create user in Supabase Auth
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password: password ?? '', // Ensure password is always a string
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          first_name,
          last_name,
          phone,
          role
        }
      });

    if (authError) throw authError;

    const userId = authData.user?.id;
    if (!userId) throw new Error('Failed to retrieve user ID');

    // Step 2: Link user to the store in `store_users` table
    const { error: storeUserError } = await supabase
      .from('store_users')
      .insert([
        {
          user_id: userId,
          store_id: parseInt(store_id),
          role
        }
      ]);

    if (storeUserError) throw storeUserError;

    return { message: 'User created successfully!' };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

export const getUserById = async (userId: string) => {
  try {
    // Step 1: Fetch user details from Supabase Auth
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.getUserById(userId);

    if (authError) throw authError;

    const user = authData.user;
    if (!user) throw new Error('User not found in Supabase Auth');

    // Step 2: Fetch store association from `store_users`
    const supabase = await createClient();
    const { data: storeUserData, error: storeUserError } = await supabase
      .from('store_users')
      .select('store_id, role')
      .eq('user_id', userId)
      .single();

    if (storeUserError) throw storeUserError;

    // Combine all data
    return {
      id: user.id,
      first_name: user.user_metadata?.first_name || '',
      last_name: user.user_metadata?.last_name || '',
      email: user.email,
      phone: user.user_metadata?.phone || '',
      role: storeUserData?.role || 'staff', // Default to "staff"
      store_id: storeUserData?.store_id || null,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw new Error('Failed to fetch user');
  }
};

export const getUsers = async ({
  page = 1,
  limit = 10,
  role
}: {
  page?: number;
  limit?: number;
  role?: string;
}): Promise<UserResponse> => {
  try {
    const supabase = await createClient();

    let query = supabase.from('store_users').select('user_id, store_id, role');

    if (role) {
      query = query.eq('role', role);
    }

    // Get total user count for pagination
    const { count, error: countError } = await query;
    if (countError) throw countError;

    // Pagination logic
    const offset = (page - 1) * limit;

    // Fetch paginated users
    const { data: storeUsers, error } = await query.range(
      offset,
      offset + limit - 1
    );
    if (error) throw error;

    // Fetch user details from Auth
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.listUsers();
    if (authError) throw authError;

    // Merge user data from auth with store associations
    const users: User[] = storeUsers
      .map((storeUser) => {
        const authUser = authData.users.find(
          (user) => user.id === storeUser.user_id
        );
        if (!authUser) return null; // Filter out null values

        return {
          id: authUser.id,
          first_name: authUser.user_metadata?.first_name || '',
          last_name: authUser.user_metadata?.last_name || '',
          email: authUser.email || '',
          phone: authUser.user_metadata?.phone || '',
          role: storeUser.role as 'owner' | 'manager' | 'staff', // Ensure role type
          store_id: storeUser.store_id || null,
          created_at: authUser.created_at
        };
      })
      .filter((user): user is User => user !== null); // Type guard to remove null values

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Fetched users successfully',
      total_users: count ?? 0,
      offset,
      limit,
      users
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};
