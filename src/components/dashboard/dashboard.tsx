'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircleIcon } from 'lucide-react';
import Image from 'next/image';

const Dashboard = () => {
  return (
    <div className='flex flex-1 flex-col space-y-4 p-4'>
      {/* Progress Bar */}
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold tracking-tight'>
          Attiva il tuo account
        </h2>
        <div className='flex items-center space-x-2'>
          <Progress value={66} className='w-40' />
          <span className='text-sm font-medium text-muted-foreground'>2/3</span>
        </div>
      </div>

      {/* Grid Layout for Sections */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
        {/* Connect Stripe Card */}
        <div className='flex flex-col gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Connetti Stripe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Solo un passo ti separa dall&apos;accettare pagamenti e attivare
                il tuo account: collega il tuo account adesso!
              </p>
              <Button className='mt-20 w-full bg-violet-600 text-white hover:bg-violet-700'>
                Connetti con Stripe
              </Button>
            </CardContent>
          </Card>

          {/* E-commerce Integration Card */}
          <Card>
            <CardHeader className='flex justify-between'>
              <div className='flex justify-between'>
                <CardTitle>Hai un e-commerce?</CardTitle>
                <div className='rounded-full bg-green-50 p-2'>
                  <CheckCircleIcon className='h-5 w-5 text-green-500' />
                </div>
              </div>
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

        {/* Store Creation Card */}
        <div>
          <Card>
            <CardHeader className='flex justify-between'>
              <div className='flex justify-between'>
                <CardTitle>Crea il tuo negozio</CardTitle>
                <div className='rounded-full bg-green-50 p-2'>
                  <CheckCircleIcon className='h-5 w-5 text-green-500' />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>
                Se possiedi più negozi o filiali, puoi gestirli tutti da un
                unico account. Clicca su &apos;Aggiungi Negozio&apos; per
                inserire le informazioni di ogni punto vendita e inizia a
                offrire le tue merci in tutta comodità.
              </p>
              <div className='mt-4 flex items-center'>
                <Image
                  src='/cloth.jpg'
                  alt='Store'
                  width={300}
                  height={100}
                  className='rounded-md'
                />
              </div>
              <div className='mt-4 flex space-x-2'>
                <Button variant='outline' className='w-full' disabled>
                  Creato
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
