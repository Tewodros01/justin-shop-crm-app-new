'use client';

import { Product } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { ImageIcon } from 'lucide-react';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'photo_url',
    header: 'IMAGE',
    cell: ({ row }) => {
      const photoUrl: string | null = row.getValue('photo_url');

      return (
        <div className="relative aspect-square w-12 h-12 flex items-center justify-center rounded-lg bg-gray-200">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={row.getValue('product_name')}
              fill
              className="rounded-lg object-cover"
            />
          ) : (
            <ImageIcon className="w-6 h-6 text-gray-500" /> // Default Icon
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'product_name',
    header: 'NAME',
  },
  {
    id: 'category',
    header: 'CATEGORY',
    cell: ({ row }) => {
      return row.original.product_categories?.category_name || 'Uncategorized';
    },
  },
  {
    accessorKey: 'price',
    header: 'PRICE',
  },
  {
    accessorKey: 'product_description',
    header: 'DESCRIPTION',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
