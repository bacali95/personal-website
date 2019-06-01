import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
