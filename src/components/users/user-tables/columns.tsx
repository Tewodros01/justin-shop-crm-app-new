'use client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { User } from 'types/user';
import { ImageIcon } from 'lucide-react';

export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'first_name',
    header: 'NAME'
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
