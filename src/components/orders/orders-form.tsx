'use client';

import { useState, useEffect } from 'react';
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
import { createStore, getStoreCategories } from '@/actions/store-action';
import { Store, StoreCategory } from 'types/store';

const formSchema = z.object({
  store_name: z.string().min(2, {
    message: 'Store name must be at least 2 characters.'
  }),
  store_email: z.string().email({
    message: 'Invalid email address.'
  }),
  store_phone: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.'
  }),
  store_address: z.string().min(5, {
    message: 'Address must be at least 5 characters.'
  }),
  postal_code: z.string().min(4, {
    message: 'Postal code must be at least 4 characters.'
  }),
  province: z.string().min(2, {
    message: 'Province must be at least 2 characters.'
  }),
  cover_image: z.string().optional(),
  additional_images: z.array(z.any()).optional(),
  free_shipping_threshold: z.string().transform((val) => parseFloat(val)), // Convert string to number
  store_hours: z.string().optional(),
  store_category_id: z.string()
});

export default function StoreForm({
  initialData,
  pageTitle
}: {
  initialData: Store | null;
  pageTitle: string;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [storeCategories, setStoreCategories] = useState<StoreCategory[]>([]);

  // Fetch store categories on component mount
  useEffect(() => {
    const fetchStoreCategories = async () => {
      try {
        const data = await getStoreCategories();
        setStoreCategories(data || []);
      } catch (error) {
        console.error('Error fetching store categories:', error);
      }
    };

    fetchStoreCategories();
  }, []);

  const defaultValues = {
    store_name: initialData?.store_name || '',
    store_email: initialData?.store_email || '',
    store_phone: initialData?.store_phone || '',
    store_address: initialData?.store_address || '',
    postal_code: initialData?.postal_code || '',
    province: initialData?.province || '',
    // cover_image: initialData?.cover_image || "",
    // additional_images: initialData?.additional_images || [],
    free_shipping_threshold: initialData?.free_shipping_threshold
      ? Number(initialData.free_shipping_threshold)
      : 0,
    store_hours: initialData?.store_hours || '',
    store_category_id: initialData?.id?.toString() || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setMessage(null);

    try {
      // Ensure all required fields have valid types
      const numericValues: Store = {
        ...values,
        store_hours: values.store_hours ?? '' // Ensure it's a string
      };

      await createStore(numericValues);

      setMessage('Store added successfully!');
      form.reset();
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <>{loading && <span>Loading...</span>}</>;
  }

  if (message) {
    return <>{message && <p className='text-red-500'>{message}</p>}</>;
  }
  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              name='store_name'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='store_email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Email</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='store_phone'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='store_address'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='postal_code'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='province'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='free_shipping_threshold'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Free Shipping Threshold</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='store_hours'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Hours</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='store_category_id'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {storeCategories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id?.toString() || ''}
                        >
                          {category.category_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Add Store</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
