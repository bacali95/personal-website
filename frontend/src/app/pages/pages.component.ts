import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'nba-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <nba-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </nba-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
