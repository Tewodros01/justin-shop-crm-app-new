'use server';

import { Store, StoreCategory } from 'types/store';
import { createClient } from 'utils/supabase/server';

// Create a new store
export const createStore = async (storeData: Store) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('stores')
      .insert([storeData])
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating store:', error);
    throw new Error('Failed to create store');
  }
};

// Read all stores
export const getStores = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from('stores').select('*');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw new Error('Failed to fetch stores');
  }
};

// Read a single store by ID
export const getStoreById = async (id: number) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching store with ID ${id}:`, error);
    throw new Error('Failed to fetch store');
  }
};

// Update a store
export const updateStore = async (id: number, updateData: Partial<Store>) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('stores')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating store with ID ${id}:`, error);
    throw new Error('Failed to update store');
  }
};

// Delete a store
export const deleteStore = async (id: number) => {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from('stores').delete().eq('id', id);

    if (error) throw error;
    return { message: 'Store deleted successfully' };
  } catch (error) {
    console.error(`Error deleting store with ID ${id}:`, error);
    throw new Error('Failed to delete store');
  }
};

// Create a new store category
export const createStoreCategory = async (categoryData: StoreCategory) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('store_categories')
      .insert([categoryData])
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating store category:', error);
    throw new Error('Failed to create store category');
  }
};

// Read all store categories
export const getStoreCategories = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from('store_categories').select('*');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching store categories:', error);
    throw new Error('Failed to fetch store categories');
  }
};

// Read a single store category by ID
export const getStoreCategoryById = async (id: number) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('store_categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching store category with ID ${id}:`, error);
    throw new Error('Failed to fetch store category');
  }
};

// Update a store category
export const updateStoreCategory = async (
  id: number,
  updateData: Partial<StoreCategory>
) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('store_categories')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating store category with ID ${id}:`, error);
    throw new Error('Failed to update store category');
  }
};

// Delete a store category
export const deleteStoreCategory = async (id: number) => {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from('store_categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { message: 'Store category deleted successfully' };
  } catch (error) {
    console.error(`Error deleting store category with ID ${id}:`, error);
    throw new Error('Failed to delete store category');
  }
};

export const getStoresWithFilter = async ({
  page = 1,
  limit = 10,
  categories,
  search
}: {
  page?: number;
  limit?: number;
  categories?: string;
  search?: string;
}) => {
  const supabase = await createClient();

  try {
    // Convert categories string to array (for filtering)
    const categoriesArray = categories ? categories.split('.') : [];

    // Base query with store category relation
    let query = supabase.from('stores').select(
      `
        id,
        store_name,
        store_email,
        store_phone,
        store_address,
        postal_code,
        province,
        cover_image,
        additional_images,
        free_shipping_threshold,
        store_hours,
        photo_url,
        created_at,
        updated_at,
        store_category_id,
        store_category:store_category_id (
          id,
          category_name
        )
      `,
      { count: 'exact' }
    );

    // Apply category filter (if provided)
    if (categoriesArray.length > 0) {
      query = query.in('store_category_id', categoriesArray.map(Number));
    }

    // Apply search filter (if provided)
    if (search) {
      query = query.ilike('store_name', `%${search}%`); // Case-insensitive search by store name
    }

    // Get total count before pagination
    const { count, error: countError } = await query;
    if (countError) throw countError;
    const totalStores = count ?? 0;

    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    // Fetch stores with category details
    const { data: stores, error } = await query;
    if (error) throw error;

    // ✅ Ensure `store_category` is a single object (not an array)
    const formattedStores = stores.map((store) => ({
      ...store,
      store_category: Array.isArray(store.store_category)
        ? store.store_category[0] || null // Extract first category if exists
        : store.store_category // Use as is if already correct
    }));

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Fetched stores successfully',
      total_stores: totalStores,
      offset,
      limit,
      stores: formattedStores
    };
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw new Error('Failed to fetch stores');
  }
};

export const getStoresList = async (): Promise<Store[]> => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from('stores').select('*');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw new Error('Failed to fetch stores');
  }
};
