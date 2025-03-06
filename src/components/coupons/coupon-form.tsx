'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { updateCoupon } from '@/actions/coupon-action';
import { Coupon } from 'types/coupon';

const formSchema = z.object({
  coupon_code: z
    .string()
    .min(3, { message: 'Coupon code must be at least 3 characters.' }),
  discount_amount: z.string().transform((val) => parseFloat(val)), // Convert to number
  coupon_status: z.enum(['active', 'used', 'expired'], {
    message: 'Select a valid coupon_status.'
  }),
  expiration_date: z.string().optional() // Nullable field
});

type CouponFormProps = {
  initialData?: Coupon | null; // Optional for editing
  pageTitle?: string;
};

export default function CouponForm({
  initialData,
  pageTitle = 'Create Coupon'
}: CouponFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const defaultValues: z.infer<typeof formSchema> = {
    coupon_code: initialData?.coupon_code || '',
    discount_amount: initialData?.discount_amount || 0,
    coupon_status: initialData?.coupon_status || 'active',
    expiration_date: initialData?.expiration_date || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setMessage(null);

    try {
      if (initialData) {
        await updateCoupon(initialData.id, values); // Update existing coupon
        setMessage('Coupon updated successfully!');
      } else {
        // await createCoupon(values); // Create new coupon
        setMessage('Coupon created successfully!');
        form.reset();
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className='mx-auto w-full max-w-lg'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              name='coupon_code'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coupon Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter coupon code' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='discount_amount'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Amount</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      {...field}
                      placeholder='Enter discount amount'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='coupon_status'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>coupon_status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select coupon_status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='active'>Active</SelectItem>
                      <SelectItem value='used'>Used</SelectItem>
                      <SelectItem value='expired'>Expired</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='expiration_date'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Date</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={loading}>
              {loading
                ? 'Saving...'
                : initialData
                  ? 'Update Coupon'
                  : 'Create Coupon'}
            </Button>
          </form>
        </Form>
        {message && (
          <p className='mt-4 text-center text-green-600'>{message}</p>
        )}
      </CardContent>
    </Card>
  );
}
