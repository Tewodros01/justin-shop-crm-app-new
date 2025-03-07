import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircleIcon } from 'lucide-react';
import Image from 'next/image';

export default function OverViewLayout() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        {/* Progress Bar */}
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Attiva il tuo account
          </h2>
          <div className='flex items-center space-x-2'>
            <Progress value={66} className='w-40' />
            <span className='text-sm font-medium text-muted-foreground'>
              2/3
            </span>
          </div>
        </div>

        {/* Grid Layout for Sections */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
          {/* Connect Stripe Card */}
          <Card>
            <CardHeader>
              <CardTitle>Connetti Stripe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Solo un passo ti separa dall'accettare pagamenti e attivare il
                tuo account: collega il tuo account adesso!
              </p>
              <Button className='mt-20 w-full bg-violet-600 text-white hover:bg-violet-700'>
                Connetti con Stripe
              </Button>
            </CardContent>
          </Card>

          {/* Store Creation Card */}
          <Card>
            <CardHeader className='flex items-center justify-between'>
              <CardTitle>Crea il tuo negozio</CardTitle>
              <CheckCircleIcon className='h-5 w-5 text-green-500' />
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Se possiedi più negozi o filiali, puoi gestirli tutti da un
                unico account. Clicca su 'Aggiungi Negozio' per inserire le
                informazioni di ogni punto vendita e inizia a offrire le tue
                merci in tutta comodità.
              </p>
              <div className='mt-4'>
                <Image
                  src='/your-image-path.jpg'
                  alt='Store'
                  width={400}
                  height={200}
                  className='rounded-md'
                />
              </div>
            </CardContent>
          </Card>

          {/* E-commerce Integration Card */}
          <Card>
            <CardHeader className='flex items-center justify-between'>
              <CardTitle>Hai un e-commerce?</CardTitle>
              <CheckCircleIcon className='h-5 w-5 text-green-500' />
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Se sì, seleziona quale CMS stai utilizzando. Ti avviseremo
                quando l’integrazione sarà abilitata.
              </p>
              <div className='mt-4 flex space-x-2'>
                <Button variant='outline' className='w-full' disabled>
                  SI
                </Button>
                <Button variant='outline' className='w-full' disabled>
                  NO
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
