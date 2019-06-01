import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Users',
    icon: 'nb-person',
    link: '/pages/user',
  },
  {
    title: 'Categories',
    icon: 'nb-list',
    link: '/pages/category',
  },
  {
    title: 'Projects',
    icon: 'nb-list',
    link: '/pages/project',
  },
];
