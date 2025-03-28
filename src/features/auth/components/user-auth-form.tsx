'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { EyeIcon, LockIcon, MailIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

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
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';
  const [loading, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password, // Ensure password is sent
        redirect: false // Prevent automatic redirect
      });

      if (result?.error) {
        toast.error('Invalid email or password!');
      } else {
        toast.success('Signed In Successfully!');
        window.location.href = callbackUrl; // Manually handle redirection
      }
    });
  };

  return (
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
          {loading ? 'Accedendo...' : 'Accedi'}
        </Button>
      </form>
    </Form>
  );
}
