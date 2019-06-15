import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Profile',
    icon: 'person-outline',
    link: '/pages/profile',
  },
  {
    title: 'Portfolio',
    icon: 'camera-outline',
    children: [
      {
        title: 'Projects',
        icon: 'list-outline',
        link: '/pages/portfolio/project',
      },
      {
        title: 'Categories',
        icon: 'list-outline',
        link: '/pages/portfolio/category',
      },
    ],
  },
];
