'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';
import {
  BookOpen,
  Calendar,
  GalleryVerticalEnd,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Tag,
  Users
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import Image from 'next/image';

export const company = {
  name: 'Acme Inc',
  logo: GalleryVerticalEnd,
  plan: 'Enterprise'
};

export default function AppSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='p-0'>
        {/* Full-width image wrapper */}
        <div className='relative h-20 w-full'>
          <Image
            src='/logo-justin-shop.png'
            alt={`${company.name} Logo`}
            fill
            className='object-cover'
            priority
            onLoad={() => console.log('Image loaded:', company.logo)}
            onError={(e: any) => console.error('Image failed to load:', e)}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip='Dashboard'
                isActive={pathname === '/dashboard/overview'}
              >
                <Link href='/dashboard'>
                  <ShoppingCart />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className=''>GESTIONE NEGOZIO</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip='Ordini'
                isActive={pathname === '/dashboard/orders'}
              >
                <Link
                  href='/dashboard/orders'
                  className='flex items-center gap-2'
                >
                  <Package />
                  Ordini
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip='Prenotazioni'
                isActive={pathname === '/dashboard/bookings'}
              >
                <Link
                  href='/dashboard/bookings'
                  className='flex items-center gap-2'
                >
                  <Calendar />
                  Prenotazioni
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip='Inventario'
                isActive={pathname === '/dashboard/inventory'}
              >
                <Link
                  href='/dashboard/inventory'
                  className='flex items-center gap-2'
                >
                  <Package />
                  Inventario
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip='Coupon'
                isActive={pathname === '/dashboard/coupons'}
              >
                <Link
                  href='/dashboard/coupons'
                  className='flex items-center gap-2'
                >
                  <Tag />
                  Coupon
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className=''>GESTIONE ACCOUNT</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip='Lista Prodotti'
                isActive={pathname === '/dashboard/products'}
              >
                <Link
                  href='/dashboard/products'
                  className='flex items-center gap-2'
                >
                  <BookOpen />
                  Lista Prodotti
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip='Negozi'
                isActive={pathname === '/dashboard/stores'}
              >
                <Link
                  href='/dashboard/stores'
                  className='flex items-center gap-2'
                >
                  <Store />
                  Negozi
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip='Utenti'
                isActive={pathname === '/dashboard/users'}
              >
                <Link
                  href='/dashboard/users'
                  className='flex items-center gap-2'
                >
                  <Users />
                  Utenti
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip='Impostazioni'
                isActive={pathname === '/dashboard/settings'}
              >
                <Link
                  href='/dashboard/settings'
                  className='flex items-center gap-2'
                >
                  <Settings />
                  Impostazioni
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
