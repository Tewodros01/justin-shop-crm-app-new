'use server';

import { createClient } from 'utils/supabase/server';
import { Coupon } from 'types/coupon';

// Create a new coupon
export const createCoupon = async (couponData: Coupon) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('coupons')
      .insert([couponData])
      .select()
      .single(); // Ensure we return a single coupon

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating coupon:', error);
    throw new Error('Failed to create coupon');
  }
};

// Update a coupon
export const updateCoupon = async (id: number, updateData: Partial<Coupon>) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('coupons')
      .update(updateData)
      .eq('id', id)
      .select()
      .single(); // Ensure we return the updated coupon

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating coupon with ID ${id}:`, error);
    throw new Error('Failed to update coupon');
  }
};

// ✅ Get a coupon by ID
export const getCouponById = async (id: number) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('id', id)
      .single(); // Ensure we return a single record

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching coupon with ID ${id}:`, error);
    throw new Error('Failed to fetch coupon');
  }
};

// ✅ Get all coupons
export const getAllCoupons = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from('coupons').select('*'); // Fetch all coupons

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching all coupons:', error);
    throw new Error('Failed to fetch coupons');
  }
};

// ✅ Get coupons with filtering, search, and pagination
export const getCouponsWithFilter = async ({
  page = 1,
  limit = 10,
  status,
  search
}: {
  page?: number;
  limit?: number;
  status?: 'active' | 'used' | 'expired';
  search?: string;
}) => {
  const supabase = await createClient();

  try {
    // Base query selecting coupons
    let query = supabase.from('coupons').select(
      `
        id,
        coupon_code,
        discount_amount,
        coupon_status,
        expiration_date,
        created_at,
        updated_at
      `,
      { count: 'exact' }
    );

    // Apply status filter (if provided)
    if (status) {
      query = query.eq('coupon_status', status);
    }

    // Apply search filter (if provided)
    if (search) {
      query = query.ilike('coupon_code', `%${search}%`); // Case-insensitive search by coupon code
    }

    // Get total count before pagination
    const { count, error: countError } = await query;
    if (countError) throw countError;
    const totalCoupons = count ?? 0;

    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    // Fetch coupons
    const { data: coupons, error } = await query;
    if (error) throw error;

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Fetched coupons successfully',
      total_coupons: totalCoupons,
      offset,
      limit,
      coupons
    };
  } catch (error) {
    console.error('Error fetching coupons:', error);
    throw new Error('Failed to fetch coupons');
  }
};
