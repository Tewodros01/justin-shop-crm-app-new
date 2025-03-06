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
import { Textarea } from '@/components/ui/textarea';
import { Product } from 'types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { createProduct, getCategories } from '@/actions/product-action';
import { Category } from 'types/product';

const formSchema = z.object({
  product_name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  barcode: z.string().optional(),
  price: z.string().transform((val) => parseFloat(val)), // Convert string to number
  discounted_price: z
    .string()
    .transform((val) => parseFloat(val))
    .optional(), // Convert string to number
  is_discount: z.boolean(),
  unit_price: z.string().transform((val) => parseFloat(val)), // Convert string to number
  quantity: z.string().transform((val) => parseInt(val, 10)), // Convert string to number
  total_price: z.string().transform((val) => parseFloat(val)), // Convert string to number
  category_id: z.string(),
  subcategory: z.string().optional(),
  brand: z.string().optional(),
  color: z.string().optional(),
  size_available: z.any().optional(),
  model_size: z.string().optional(),
  model_height: z.string().optional(),
  fit: z.string().optional(),
  gender: z.string().optional(),
  inventory_status: z.string().optional(),
  customizable: z.boolean(),
  product_description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  }),
  auto_completion: z.boolean(),
  reservations: z.boolean(),
  coupons_applied: z.any().optional()
});

export default function ProductForm({
  initialData,
  pageTitle
}: {
  initialData: Product | null;
  pageTitle: string;
}) {
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

  const defaultValues = {
    product_name: initialData?.product_name || '',
    barcode: initialData?.barcode || '',
    price: initialData?.price ? Number(initialData.price) : 0,
    discounted_price: initialData?.discounted_price
      ? Number(initialData.discounted_price)
      : 0,
    is_discount: initialData?.is_discount || false,
    unit_price: initialData?.unit_price ? Number(initialData.unit_price) : 0,
    quantity: initialData?.quantity ? Number(initialData.quantity) : 0,
    total_price: initialData?.total_price ? Number(initialData.total_price) : 0,
    category_id: initialData?.category_id?.toString() || '',
    subcategory: initialData?.subcategory?.toString() || '',
    brand: initialData?.brand || '',
    color: initialData?.color || '',
    size_available: initialData?.size_available || '',
    model_size: initialData?.model_size || '',
    model_height: initialData?.model_height || '',
    fit: initialData?.fit || '',
    gender: initialData?.gender || '',
    inventory_status: initialData?.inventory_status || '',
    customizable: initialData?.customizable || false,
    product_description: initialData?.product_description || '',
    auto_completion: initialData?.auto_completion || false,
    reservations: initialData?.reservations || false
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  // Get subcategories based on the selected category_id
  const subcategories = categories.filter(
    (category) =>
      category.parent_category_id === Number(form.watch('category_id'))
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setMessage(null);

    try {
      // Convert string values to numbers
      const numericValues = {
        ...values,
        category_id: Number(values.category_id),
        subcategory: Number(values.subcategory)
      };

      await createProduct(numericValues);

      setMessage('Product added successfully!');
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
              name='product_name'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='barcode'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barcode</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='price'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='discounted_price'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discounted Price</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='size_available'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Available </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='model_size'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Size </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='model_height'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model Height </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='unit_price'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Price</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='quantity'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='total_price'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Price</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='gender'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select Gender' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='male'>Male</SelectItem>
                      <SelectItem value='female'>Female</SelectItem>
                      <SelectItem value='unisex'>Unisex</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='category_id'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories
                        .filter((category) => !category.parent_category_id) // Only show top-level categories
                        .map((category) => (
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

            <FormField
              name='subcategory'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a subcategory' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subcategories.map((subcategory) => (
                        <SelectItem
                          key={subcategory.id}
                          value={subcategory.id?.toString() || ''}
                        >
                          {subcategory.category_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='product_description'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Add Product</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
