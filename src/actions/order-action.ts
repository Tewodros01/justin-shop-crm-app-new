'use server';

import { createClient } from 'utils/supabase/server';

export const getOrdersWithFilter = async ({
  page = 1,
  limit = 10,
  userId,
  orderStatus,
  orderCode,
  search
}: {
  page?: number;
  limit?: number;
  userId?: string;
  orderStatus?: string;
  orderCode?: string;
  search?: string; // Can be used for searching by first name, last name, email, or phone
}) => {
  const supabase = await createClient();
  console.log('Get Order with filter');

  try {
    // Base query for orders
    let query = supabase.from('orders').select(
      `
          id,
          created_at,
          order_code,
          user_id,
          order_status,
          order_date,
          subtotal,
          shipping_fee,
          discount,
          total_amount,
          first_name,
          last_name,
          phone,
          email,
          city,
          postal_code,
          street_address
        `,
      { count: 'exact' }
    );

    // Apply filters
    if (userId) {
      query = query.eq('user_id', userId);
    }
    if (orderStatus) {
      query = query.eq('order_status', orderStatus);
    }
    if (orderCode) {
      query = query.eq('order_code', orderCode);
    }
    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
      );
    }

    // Get total count before pagination
    const { count, error: countError } = await query;
    if (countError) throw countError;
    const totalOrders = count ?? 0;

    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    // Fetch orders
    const { data: orders, error } = await query;
    if (error) throw error;

    // ✅ Ensure `user` is a single object, not an array
    const formattedOrders = orders.map((order) => ({
      ...order
      // user: Array.isArray(order) ? order.user[0] || null : order.user, // Extract first user if exists
    }));

    console.log(`It reachs Here: ${formattedOrders}`);

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Fetched orders successfully',
      total_orders: totalOrders,
      offset,
      limit,
      orders: formattedOrders
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
};
