'use server';

import { createClient } from 'utils/supabase/server';

export const getBookingsWithFilter = async ({
  page = 1,
  limit = 10,
  userId,
  productId,
  bookingStatus,
  search
}: {
  page?: number;
  limit?: number;
  userId?: string;
  productId?: number;
  bookingStatus?: string;
  search?: string; // Could be used for searching by billing name or email
}) => {
  const supabase = await createClient();
  console.log('Get Booking with filter');

  try {
    // Base query for bookings
    let query = supabase.from('bookings').select(
      `id,
       qr_code,
       product_id,
       user_id,
       booking_size,
       booking_status,
       expiration_time,
       billing_name,
       billing_email,
       billing_phone,
       shipping_city,
       shipping_province,
       shipping_postal_code,
       shipping_state,
       shipping_notes,
       created_at,
       updated_at,
       products:product_id (
         id,
         product_name,
         price
       )`,
      { count: 'exact' }
    );

    // Apply filters
    if (userId) {
      query = query.eq('user_id', userId);
    }
    if (productId) {
      query = query.eq('product_id', productId);
    }
    if (bookingStatus) {
      query = query.eq('booking_status', bookingStatus);
    }
    if (search) {
      query = query.or(
        `billing_name.ilike.%${search}%,billing_email.ilike.%${search}%`
      );
    }

    // Get total count before pagination
    const { count, error: countError } = await query;
    if (countError) throw countError;
    const totalBookings = count ?? 0;

    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    // Fetch bookings
    const { data: bookings, error } = await query;
    if (error) throw error;

    // ✅ Ensure `product` and `user` are single objects, not arrays
    const formattedBookings = bookings.map((booking) => ({
      ...booking,
      products: Array.isArray(booking.products)
        ? booking.products[0] || null
        : booking.products
      // user: Array.isArray(booking.user)? booking.user[0] || null: booking.user,
    }));
    console.log(`It reachs Here: ${bookings}`);

    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Fetched bookings successfully',
      total_bookings: totalBookings,
      offset,
      limit,
      bookings: formattedBookings
    };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('Failed to fetch bookings');
  }
};
