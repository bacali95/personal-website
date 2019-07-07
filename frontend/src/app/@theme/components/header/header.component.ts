import {Component, OnDestroy, OnInit} from '@angular/core';

import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {


  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
  ];

  currentTheme = 'default';

  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private authService: NbAuthService,
              private router: Router,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout() {
    this.authService.logout('title').subscribe(() => {
      this.router.navigate(['auth/login']);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
