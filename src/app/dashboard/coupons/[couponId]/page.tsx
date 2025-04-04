import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import CouponViewPage from '@/components/coupons/coupon-view-page';

export const metadata = {
  title: 'Dashboard : Product View',
};

type PageProps = { params: Promise<{ couponId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <CouponViewPage couponId={params.couponId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
