import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'nba-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: NbAuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  logout() {
    this.authService.logout('title').subscribe(() => {
      this.router.navigate(['auth/login']);
    });
  }
}
