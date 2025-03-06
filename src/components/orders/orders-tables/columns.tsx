'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

import { Order } from 'types/order';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'order_code',
    header: 'Order Code'
  },
  // {
  //   id: "user",
  //   header: "Client",
  //   cell: ({ row }) => {
  //     return row.original.user?.email || "";
  //   },
  // },
  {
    accessorKey: 'order_status',
    header: 'Order Status'
  },
  {
    accessorKey: 'order_date',
    header: 'Order Date'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
