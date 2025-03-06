import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import StoreForm from './store-form';
import { Store } from 'types/store'; // Import the correct Store type

type TStoreViewPageProps = {
  storeId: string;
};

export default async function StoreViewPage({ storeId }: TStoreViewPageProps) {
  let store: Store | null = null;
  let pageTitle = 'Create New Store';

  if (storeId !== 'new') {
    const data = await fakeProducts.getProductById(Number(storeId)); // Fetch product
    const product = data.product as Product;

    if (!product) {
      notFound();
    }

    // Transform `Product` to match `Store` structure
    store = {
      id: product.id,
      store_name: product.name, // Map product name to store name
      store_email: 'store@example.com', // Placeholder email
      store_phone: '1234567890', // Placeholder phone number
      store_address: '123 Fake Street', // Placeholder address
      postal_code: '00000', // Placeholder postal code
      province: 'Example Province', // Placeholder province
      // Empty array for now
      free_shipping_threshold: 50, // Arbitrary default value
      store_hours: '9 AM - 5 PM', // Placeholder hours
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    pageTitle = `Edit Store`;
  }

  return <StoreForm initialData={store} pageTitle={pageTitle} />;
}
