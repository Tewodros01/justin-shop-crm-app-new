import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './orders-tables/columns';
import { getOrdersWithFilter } from '@/actions/order-action';
import { Order } from 'types/order';

type OrderListingPage = object;

export default async function OrderListingPage({}: OrderListingPage) {
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

  const data = await getOrdersWithFilter(filters);
  const totalProducts = data.total_orders;
  const order: Order[] = data.orders;

  return (
    <ProductTable columns={columns} data={order} totalItems={totalProducts} />
  );
}
