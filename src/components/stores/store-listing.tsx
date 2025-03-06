import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './store-tables/columns';
import { getStoresWithFilter } from '@/actions/store-action';
import { Store } from 'types/store-data';

type StoreListingPage = object;

export default async function StoreListingPage({}: StoreListingPage) {
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

  const data = await getStoresWithFilter(filters);
  const totalProducts = data.total_stores;
  const store: Store[] = data.stores;

  return (
    <ProductTable columns={columns} data={store} totalItems={totalProducts} />
  );
}
