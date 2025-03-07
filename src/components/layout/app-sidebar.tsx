'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';
import { navItems } from '@/constants/data';
import {
  BadgeCheck,
  Bell,
  BookOpen,
  Calendar,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  GalleryVerticalEnd,
  Icon,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Tag,
  Users
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../icons';

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
      <SidebarHeader>
        <div className='flex gap-2 py-2'>
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
            <company.logo className='size-4' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>{company.name}</span>
            <span className='truncate text-xs'>{company.plan}</span>
          </div>
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
