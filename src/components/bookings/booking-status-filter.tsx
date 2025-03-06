'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const statuses = [
  { label: 'In Attesa', value: 'pending' },
  { label: 'Pronto per ritiro', value: 'ready' },
  { label: 'Confermati', value: 'confirmed' },
  { label: 'Annullato', value: 'canceled' },
];

export default function BookingStatusFilter() {
  const [activeStatus, setActiveStatus] = useState('pending');

  return (
    <div className="flex space-x-2">
      {statuses.map(status => (
        <button
          key={status.value}
          onClick={() => setActiveStatus(status.value)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md border transition',
            activeStatus === status.value
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
          )}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
}
