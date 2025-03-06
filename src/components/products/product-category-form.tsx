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
import { createCategory, getCategories } from '@/actions/product-action';
import { Category } from 'types/product';

// Zod schema for category form
const categoryFormSchema = z.object({
  category_name: z.string().min(2, {
    message: 'Category name must be at least 2 characters.'
  }),
  parent_category_id: z.string().optional(),
  category_type: z.string().optional(),
  category_description: z.string().optional(),
  category_image_url: z.string().optional(),
  category_slug: z.string().optional(),
  category_status: z.string().optional(),
  category_display_order: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().optional()
  ),
  category_seo_title: z.string().optional(),
  category_seo_description: z.string().optional(),
  category_seo_keywords: z.string().optional()
});

export default function ProductCategoryForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Form hook
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      category_name: '',
      parent_category_id: '',
      category_type: '',
      category_description: '',
      category_image_url: '',
      category_slug: '',
      category_status: '',
      category_display_order: undefined,
      category_seo_title: '',
      category_seo_description: '',
      category_seo_keywords: ''
    }
  });

  // Form submission handler
  async function onSubmit(values: z.infer<typeof categoryFormSchema>) {
    setLoading(true);
    setMessage(null);

    try {
      // Convert string values to numbers
      const numericValues = {
        ...values,
        parent_category_id: values.parent_category_id
          ? Number(values.parent_category_id)
          : null,
        category_display_order: values.category_display_order
          ? Number(values.category_display_order)
          : null
      };

      await createCategory(numericValues);

      setMessage('Category added successfully!');
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
          Add Product Category
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
                      {categories.map((category) => (
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

            {/* Category Type */}
            <FormField
              name='category_type'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Description */}
            <FormField
              name='category_description'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Image URL */}
            <FormField
              name='category_image_url'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Slug */}
            <FormField
              name='category_slug'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Status */}
            <FormField
              name='category_status'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Status</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Display Order */}
            <FormField
              name='category_display_order'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category SEO Title */}
            <FormField
              name='category_seo_title'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category SEO Description */}
            <FormField
              name='category_seo_description'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category SEO Keywords */}
            <FormField
              name='category_seo_keywords'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Keywords</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type='submit'>Add Category</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
