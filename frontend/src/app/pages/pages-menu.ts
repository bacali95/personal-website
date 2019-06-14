import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Users',
    icon: 'people-outline',
    link: '/pages/user',
  },
  {
    title: 'Categories',
    icon: 'list-outline',
    link: '/pages/category',
  },
  {
    title: 'Projects',
    icon: 'list-outline',
    link: '/pages/project',
  },
];
