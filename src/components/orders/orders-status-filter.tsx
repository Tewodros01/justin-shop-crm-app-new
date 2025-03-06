'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const statuses = [
  { label: 'In Attesa', value: 'pending', count: 0, active: true },
  { label: 'In Lavorazione', value: 'processing', count: 2 },
  { label: 'Spediti', value: 'shipped', count: 1 },
  { label: 'Completati', value: 'completed', count: 0 },
  { label: 'Annullati', value: 'canceled', count: 0 },
  { label: 'Tutti Ordini', value: 'all', count: 0 },
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
            'relative flex items-center px-4 py-2 text-sm font-medium rounded-md border transition',
            activeStatus === status.value
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
          )}
        >
          {status.label}
          {status.count > 0 && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-200 text-xs text-black">
              {status.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
