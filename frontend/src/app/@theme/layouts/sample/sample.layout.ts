import {AfterViewInit, Component, Inject, PLATFORM_ID, ViewChild} from '@angular/core';
import {NbLayoutComponent} from '@nebular/theme';
import {isPlatformBrowser} from '@angular/common';
import {WindowModeBlockScrollService} from '../../services/window-mode-block-scroll.service';

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
                  responsive>
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
export class SampleLayoutComponent implements AfterViewInit {

  @ViewChild(NbLayoutComponent, {static: false}) layout: NbLayoutComponent;

  constructor(@Inject(PLATFORM_ID) private platformId,
              private windowModeBlockScrollService: WindowModeBlockScrollService) {
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowModeBlockScrollService.register(this.layout);
    }
  }
}
