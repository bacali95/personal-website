import {Component, OnDestroy} from '@angular/core';
import {delay, takeWhile, withLatestFrom} from 'rxjs/operators';
import {NbMediaBreakpoint, NbMediaBreakpointsService, NbMenuItem, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

// TODO: move layouts into the framework
@Component({
  selector: 'sample-layout',
  styleUrls: ['./sample.layout.scss'],
  template: `
    <nb-layout center="false" windowMode>
      <nb-layout-header fixed>
        <header></header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar"
                  tag="menu-sidebar"
                  responsive
                  end="false">
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="main-content">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <footer></footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class SampleLayoutComponent implements OnDestroy {

  subMenu: NbMenuItem[] = [
    {
      title: 'PAGE LEVEL MENU',
    },
  ];
  layout: any = {};
  sidebar: any = {};

  private alive = true;

  currentTheme: string;

  constructor(protected menuService: NbMenuService,
              protected themeService: NbThemeService,
              protected bpService: NbMediaBreakpointsService,
              protected sidebarService: NbSidebarService) {
    const isBp = this.bpService.getByName('is');
    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
        delay(20),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
