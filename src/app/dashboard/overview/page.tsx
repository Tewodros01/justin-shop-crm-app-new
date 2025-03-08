import { SearchParams } from 'nuqs/server';
import Dashboard from '@/components/dashboard/dashboard';

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata = {
  title: 'Dashboard : Overflow'
};

export default async function Page({ searchParams }: pageProps) {
  return <Dashboard />;
}
