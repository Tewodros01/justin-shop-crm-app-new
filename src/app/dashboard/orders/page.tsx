import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import OrderListingPage from '@/components/orders/orders-listing';
import OrderTableAction from '@/components/orders/orders-tables/orders-table-action';
// import BookingStatusFilter from '@/components/orders/orders-status-filter';

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
  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Ordini" description="Manage Ordini " />
        </div>
        {/* <BookingStatusFilter /> */}

        <Separator />
        <OrderTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <OrderListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
