'use client';

import PageContainer from '@/components/layout/page-container';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircleIcon } from 'lucide-react';

const tabs = [
  { name: 'Stato Connessione', value: 'status' },
  { name: 'FAQ', value: 'faq' },
  { name: 'Supporto', value: 'support' },
  { name: 'Altro', value: 'other' }
];

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = searchParams.get('tab') || 'status';

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <PageContainer scrollable={false}>
      {/* Tabs */}
      <div className='flex w-full flex-col'>
        <div className='flex space-x-2 rounded-md bg-white'>
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant='outline'
              onClick={() => handleTabChange(tab.value)}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-medium',
                activeTab === tab.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-black hover:bg-gray-200'
              )}
            >
              {tab.name}
            </Button>
          ))}
        </div>

        {/* Connection Status */}
        {activeTab === 'status' && (
          <div className='mt-6 space-y-4'>
            {/* Stripe Connection Status */}
            <Card>
              <CardHeader>
                <CardTitle>Stato Connessione</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-lg font-semibold'>Stripe</p>
              </CardContent>
            </Card>

            {/* E-commerce Connection Status */}
            <Card>
              <CardHeader className='flex items-center justify-between'>
                <div>
                  <CardTitle>Stato Connessione</CardTitle>
                  <p className='text-lg font-semibold'>E-commerce</p>
                </div>
                <CheckCircleIcon className='h-6 w-6 text-green-500' />
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>
                  Collega il tuo e-commerce per semplificare la gestione dei
                  prodotti nel tuo negozio online.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Placeholder Content for Other Tabs */}
        {activeTab !== 'status' && (
          <div className='mt-6 text-center text-gray-500'>
            Contenuto di "{tabs.find((t) => t.value === activeTab)?.name}" in
            fase di sviluppo...
          </div>
        )}
      </div>
    </PageContainer>
  );
}
