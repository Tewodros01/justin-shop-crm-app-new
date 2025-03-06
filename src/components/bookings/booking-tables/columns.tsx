'use client';
import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';

import { Booking } from 'types/booking';

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: 'qr_code',
    header: 'Qr Code'
  },
  // {
  //   id: "product",
  //   header: "Product",
  //   cell: ({ row }) => {
  //     return row.original.product?.name || "";
  //   },
  // },
  {
    accessorKey: 'booking_status',
    header: 'Booking Status'
  },
  {
    accessorKey: 'billing_email',
    header: 'Billing Email'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
