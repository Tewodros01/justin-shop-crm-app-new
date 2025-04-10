'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from './user-auth-form';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/examples/authentication'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-[#fe8442]' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <div className='r relative h-14 w-52'>
            <Image
              src='/logo-justin-shop-white.png'
              alt={`Logo`}
              fill
              className='object-cover transition-all duration-300'
              priority
            />
          </div>
        </div>

        {/* Screenshot / Illustration */}
        <div className='absolute top-40 z-20 flex w-full justify-center'>
          <Image
            src='/1.png'
            alt='Order Activity Illustration'
            width={600} // Increased width
            height={500} // Increased height
            className='w-full max-w-lg object-contain' // Ensuring it scales well
          />
        </div>

        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              Gestisci II Tuo Negozio e II Tuo Catalogo Facilmente
            </p>
            <footer className='text-sm'>
              Tutto ciò che ti serve a portata di click
            </footer>
          </blockquote>
        </div>
      </div>

      <div className='flex h-full items-center p-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Create an account
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className='px-8 text-center text-sm text-muted-foreground'>
            By clicking continue, you agree to our{' '}
            <Link
              href='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
