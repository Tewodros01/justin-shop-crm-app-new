import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './coupon-tables/columns';
import { getCouponsWithFilter } from '@/actions/coupon-action';
import { Coupon } from 'types/coupon';

type CouponsListingPage = object;

export default async function CouponsListingPage({}: CouponsListingPage) {
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

  const data = await getCouponsWithFilter(filters);
  const totalCoupons = data.total_coupons;
  const coupon: Coupon[] = data.coupons;

  return (
    <ProductTable columns={columns} data={coupon} totalItems={totalCoupons} />
  );
}
