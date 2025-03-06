'use server';

import { Category, Product } from 'types/product';
import { createClient } from 'utils/supabase/server';

// Create a new product category
export const createCategory = async (categoryData: Category) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('product_categories')
      .insert([categoryData])
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Failed to create category');
  }
};

// Read all product categories
export const getCategories = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

// Read a single product category by ID
export const getCategoryById = async (id: number) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    throw new Error('Failed to fetch category');
  }
};

// Update a product category
export const updateCategory = async (
  id: number,
  updateData: Partial<Category>
) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('product_categories')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating category with ID ${id}:`, error);
    throw new Error('Failed to update category');
  }
};

// Delete a product category
export const deleteCategory = async (id: number) => {
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from('product_categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { message: 'Category deleted successfully' };
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error);
    throw new Error('Failed to delete category');
  }
};

// Create a new product
export const createProduct = async (productData: Product) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
};

// Read all products
export const getProducts = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from('products').select('*');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

// Read a single product by ID
export const getProductById = async (id: number) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw new Error('Failed to fetch product');
  }
};

// Update a product
export const updateProduct = async (
  id: number,
  updateData: Partial<Product>
) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw new Error('Failed to update product');
  }
};

// Delete a product
export const deleteProduct = async (id: number) => {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) throw error;
    return { message: 'Product deleted successfully' };
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw new Error('Failed to delete product');
  }
};

export const getProductsWithFilter = async ({
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
    const categoriesArray = categories ? categories.split('.') : [];

    let query = supabase.from('products').select(
      `
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
        product_categories:category_id (
          id,
          category_name,
          category_slug
        )
      `,
      { count: 'exact' }
    );

    if (categoriesArray.length > 0) {
      query = query.in('category_id', categoriesArray.map(Number));
    }

    if (search) {
      query = query.ilike('product_name', `%${search}%`);
    }

    const { count, error: countError } = await query;
    if (countError) throw countError;
    const totalProducts = count ?? 0;

    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: products, error } = await query;
    if (error) throw error;

    // ✅ Fix: Ensure product_categories is a single object (not an array)
    const formattedProducts = products.map((product) => ({
      ...product,
      product_categories: Array.isArray(product.product_categories)
        ? product.product_categories[0] || null // Extract first category if exists
        : product.product_categories // Use as is if already correct
    }));

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Fetched products successfully',
      total_products: totalProducts,
      offset,
      limit,
      products: formattedProducts
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};
