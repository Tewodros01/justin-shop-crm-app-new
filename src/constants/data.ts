import { NavItem } from 'types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Ordini',
    url: '/dashboard/orders',
    icon: 'package',
    shortcut: ['o', 'o'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Prenotazioni',
    url: '/dashboard/bookings',
    icon: 'calendar',
    shortcut: ['p', 'p'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Inventario',
    url: '/dashboard/inventory',
    icon: 'package',
    shortcut: ['i', 'i'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Coupon',
    url: '/dashboard/coupons',
    icon: 'tag',
    shortcut: ['c', 'c'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Lista Prodotti',
    url: '/dashboard/products',
    icon: 'bookOpen',
    shortcut: ['l', 'p'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Negozi',
    url: '/dashboard/stores',
    icon: 'store',
    shortcut: ['n', 'n'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Utenti',
    url: '/dashboard/users',
    icon: 'users',
    shortcut: ['u', 'u'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Impostazioni',
    url: '/dashboard/settings',
    icon: 'settings',
    shortcut: ['s', 's'],
    items: [] // Empty array as there are no child items for Dashboard
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
