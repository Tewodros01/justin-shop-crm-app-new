import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './user-tables/columns';
import { getUsers } from '@/actions/user-action';
import { User } from 'types/user';

type UserListingPage = object;

export default async function UserListingPage({}: UserListingPage) {
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

  const data = await getUsers(filters);
  const totalProducts = data.total_users;
  const user: User[] = data.users;

  return (
    <ProductTable columns={columns} data={user} totalItems={totalProducts} />
  );
}
