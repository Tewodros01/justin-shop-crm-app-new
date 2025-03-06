'use server';

import { createClient } from 'utils/supabase/server';

export interface StoreInventory {
  id?: number; // Primary Key (int8)
  store_id: number; // Foreign key to `stores.id`
  product_id: number; // Foreign key to `products.id`
  stock_quantity: number; // Stock quantity (int8)
  stock_status?: string | null; // Stock status (varchar)
  last_updated?: string | null; // Timestamp (nullable)
  created_at?: string | null; // Timestamp with default `now()`
}

// ✅ Create a new store inventory entry
export const createStoreInventory = async (inventoryData: StoreInventory) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('store_inventories')
      .insert([inventoryData])
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding product to store:', error);
    throw new Error('Failed to add product to store');
  }
};

// ✅ Fetch all stores
export const getStores = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('stores')
      .select('id, store_name');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw new Error('Failed to fetch stores');
  }
};

// ✅ Fetch store inventory by store ID
export const getStoreInventoryByStore = async (store_id: number) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('store_inventories')
      .select(
        `
        id,
        product_id,
        stock_quantity,
        stock_status,
        last_updated,
        created_at,
        products:product_id (product_name, price, barcode, photo_url)
      `
      )
      .eq('store_id', store_id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching inventory for store ID ${store_id}:`, error);
    throw new Error('Failed to fetch store inventory');
  }
};

// ✅ Update store inventory
export const updateStoreInventory = async (
  id: number,
  updateData: Partial<StoreInventory>
) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('store_inventories')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating store inventory with ID ${id}:`, error);
    throw new Error('Failed to update store inventory');
  }
};

// ✅ Delete store inventory entry
export const deleteStoreInventory = async (id: number) => {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from('store_inventories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { message: 'Store inventory deleted successfully' };
  } catch (error) {
    console.error(`Error deleting store inventory with ID ${id}:`, error);
    throw new Error('Failed to delete store inventory');
  }
};

export const getStoreInventoryProducts = async ({
  storeId,
  page = 1,
  limit = 10,
  categories,
  search
}: {
  storeId: number;
  page?: number;
  limit?: number;
  categories?: string;
  search?: string;
}) => {
  const supabase = await createClient();

  try {
    const categoriesArray = categories ? categories.split('.') : [];

    let query = supabase
      .from('store_inventories')
      .select(
        `
        id,
        store_id,
        product_id,
        stock_quantity,
        stock_status,
        last_updated,
        created_at,
        products:product_id (
          id,
          product_name,
          barcode,
          price,
          discounted_price,
          created_at,
          is_discount,
          unit_price,
          quantity,
          total_price,
          category_id,
          brand,
          color,
          product_description,
          seo_title,
          seo_description,
          seo_keywords,
          photo_url,
          product_category:category_id (
            id,
            category_name,
            category_slug
          )
        )
      `,
        { count: 'exact' }
      )
      .eq('store_id', storeId);

    if (categoriesArray.length > 0) {
      query = query.in('products.category_id', categoriesArray.map(Number));
    }

    if (search) {
      query = query.ilike('products.product_name', `%${search}%`);
    }

    const { count, error: countError } = await query;
    if (countError) throw countError;
    const totalProducts = count ?? 0;

    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: inventory, error } = await query;
    if (error) throw error;

    // ✅ Ensure `product_category` is treated as an object
    const formattedInventory = inventory.map((item) => {
      const product = item.products || {};
      // const category = Array.isArray(product.product_category)
      //   ? product.product_category.length > 0
      //     ? product.product_category[0] // ✅ Extract first category
      //     : null
      //   : product.product_category; // ✅ Use as is if not an array

      return {
        ...item,
        products: {
          ...product
          // product_category: category, // ✅ Assign single category object
        }
      };
    });

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Fetched store inventory products successfully',
      total_products: totalProducts,
      offset,
      limit,
      products: formattedInventory
    };
  } catch (error) {
    console.error('Error fetching store inventory products:', error);
    throw new Error('Failed to fetch store inventory products');
  }
};
