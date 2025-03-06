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
import { Textarea } from '@/components/ui/textarea';
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
import {
  createStoreCategory,
  getStoreCategories
} from '@/actions/store-action';
import { StoreCategory } from 'types/store';

// Zod schema for store category form
const storeCategoryFormSchema = z.object({
  category_name: z.string().min(2, {
    message: 'Category name must be at least 2 characters.'
  }),
  parent_category_id: z.string().optional(),
  store_description: z.string().optional(),
  store_image: z.string().optional()
});

export default function StoreCategoryForm() {
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

  // Form hook
  const form = useForm<z.infer<typeof storeCategoryFormSchema>>({
    resolver: zodResolver(storeCategoryFormSchema),
    defaultValues: {
      category_name: '',
      parent_category_id: '',
      store_description: '',
      store_image: ''
    }
  });

  // Form submission handler
  async function onSubmit(values: z.infer<typeof storeCategoryFormSchema>) {
    setLoading(true);
    setMessage(null);

    try {
      // Convert string values to numbers where applicable
      const numericValues = {
        ...values,
        parent_category_id: values.parent_category_id
          ? Number(values.parent_category_id)
          : null
      };

      await createStoreCategory(numericValues);

      setMessage('Store category added successfully!');
      form.reset();
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          Add Store Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* Category Name */}
            <FormField
              name='category_name'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Parent Category ID */}
            <FormField
              name='parent_category_id'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a parent category' />
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

            {/* Store Description */}
            <FormField
              name='store_description'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Store Image */}
            <FormField
              name='store_image'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type='submit' disabled={loading}>
              {loading ? 'Adding...' : 'Add Store Category'}
            </Button>

            {/* Success/Error Message */}
            {message && (
              <p className='mt-2 text-center text-sm text-gray-600'>
                {message}
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
