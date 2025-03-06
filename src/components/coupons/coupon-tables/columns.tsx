'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { ImageIcon } from 'lucide-react';
import { Coupon } from 'types/coupon';

export const columns: ColumnDef<Coupon>[] = [
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
    accessorKey: 'coupon_code',
    header: 'Coupon Code'
  },
  {
    accessorKey: 'discount_amount',
    header: 'Discount Amount'
  },
  {
    accessorKey: 'coupon_status',
    header: 'Coupon Status'
  },
  {
    accessorKey: 'expiration_date',
    header: 'Expiration Date'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
