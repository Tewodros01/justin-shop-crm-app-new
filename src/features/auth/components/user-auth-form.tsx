'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import { EyeIcon, MailIcon, LockIcon } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  email: z.string().email({ message: 'Inserisci un indirizzo email valido' }),
  password: z
    .string()
    .min(6, { message: 'La password deve avere almeno 6 caratteri' }),
  remember: z.boolean().optional()
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '', remember: false }
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl ?? '/dashboard'
      });
      toast.success('Accesso effettuato con successo!');
    } catch (error) {
      toast.error("Errore durante l'accesso.");
    }
    setLoading(false);
  };

  return (
    <div className='flex h-screen'>
      {/* Left Section (Illustration) */}
      <div className='relative hidden flex-1 items-center justify-center bg-orange-500 lg:flex'>
        <div className='max-w-sm text-center text-white'>
          <Image
            src='/your-illustration-path.png'
            alt='Shop Illustration'
            width={400}
            height={400}
          />
          <h2 className='mt-6 text-lg font-bold'>
            Gestisci Il Tuo Negozio e Il Tuo Catalogo Facilmente
          </h2>
          <p className='text-sm opacity-90'>
            Tutto ciò che ti serve a portata di click
          </p>
        </div>
      </div>

      {/* Right Section (Login Form) */}
      <div className='flex flex-1 items-center justify-center'>
        <div className='w-full max-w-md space-y-6 px-8'>
          <h2 className='text-2xl font-bold'>Accedi al tuo Account</h2>
          <p className='text-sm text-muted-foreground'>
            Bentornato! Inserisci le tue credenziali.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* Email Field */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='relative'>
                        <MailIcon className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
                        <Input
                          type='email'
                          placeholder='Email'
                          className='pl-10'
                          disabled={loading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='relative'>
                        <LockIcon className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Password'
                          className='pl-10 pr-10'
                          disabled={loading}
                          {...field}
                        />
                        <EyeIcon
                          className='absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400'
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me & Forgot Password */}
              <div className='flex items-center justify-between'>
                <FormField
                  control={form.control}
                  name='remember'
                  render={({ field }) => (
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='remember'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label htmlFor='remember' className='text-sm'>
                        Ricorda credenziali
                      </label>
                    </div>
                  )}
                />
                <a href='#' className='text-sm text-orange-500 hover:underline'>
                  Password dimenticata?
                </a>
              </div>

              {/* Login Button */}
              <Button
                disabled={loading}
                className='w-full bg-orange-500 text-white hover:bg-orange-600'
                type='submit'
              >
                Accedi
              </Button>
            </form>
          </Form>

          {/* Register Link */}
          <p className='text-center text-sm'>
            Non hai un Account?{' '}
            <a href='#' className='font-medium text-orange-500 hover:underline'>
              Registrati Ora!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
