import { notFound } from 'next/navigation';
import CouponForm from './coupon-form';
import { getCouponById } from '@/actions/coupon-action';
import { Coupon } from 'types/coupon';

type TCouponViewPageProps = {
  couponId: string;
};

export default async function CouponViewPage({
  couponId
}: TCouponViewPageProps) {
  let coupon: Coupon | null = null;
  let pageTitle = 'Create New Coupon';

  if (couponId !== 'new') {
    const data = await getCouponById(Number(couponId)); // Fetch coupon

    if (!data) {
      notFound();
    }

    // Map data to Coupon type
    coupon = {
      id: data.id,
      coupon_code: data.coupon_code,
      discount_amount: data.discount_amount,
      coupon_status: data.status,
      expiration_date: data.expiration_date,
      created_at: data.created_at,
      updated_at: data.updated_at
    };

    pageTitle = `Edit Coupon`;
  }

  return <CouponForm initialData={coupon} pageTitle={pageTitle} />;
}
