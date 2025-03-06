import PageContainer from '@/components/layout/page-container';
import ProductCategoryForm from '@/components/stores/store-category-form';
import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/server';

export const metadata = {
  title: 'Dashboard: Products',
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  //const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable>
      <ProductCategoryForm />
    </PageContainer>
  );
}
