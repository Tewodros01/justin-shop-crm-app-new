'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { ImageIcon } from 'lucide-react';
import { Product } from 'types/product-type';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'photo_url',
    header: 'IMAGE',
    cell: ({ row }) => {
      const photoUrl: string | null = row.getValue('photo_url');

      return (
        <div className='relative flex aspect-square h-12 w-12 items-center justify-center rounded-lg bg-gray-200'>
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={row.getValue('product_name')}
              fill
              className='rounded-lg object-cover'
            />
          ) : (
            <ImageIcon className='h-6 w-6 text-gray-500' /> // Default Icon
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'product_name',
    header: 'NAME'
  },
  {
    id: 'category',
    header: 'CATEGORY',
    cell: ({ row }) => {
      return row.original.product_categories?.category_name || 'Uncategorized';
    }
  },
  {
    accessorKey: 'price',
    header: 'PRICE'
  },
  {
    accessorKey: 'product_description',
    header: 'DESCRIPTION'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
