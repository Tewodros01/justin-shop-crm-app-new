import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './booking-tables/columns';

import { getBookingsWithFilter } from '@/actions/booking-action';
import { Booking } from 'types/booking';

type BookingListingPage = object;

export default async function BookingListingPage({}: BookingListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const data = await getBookingsWithFilter(filters);
  const totalProducts = data.total_bookings;
  const store: Booking[] = data.bookings;

  return (
    <ProductTable columns={columns} data={store} totalItems={totalProducts} />
  );
}
