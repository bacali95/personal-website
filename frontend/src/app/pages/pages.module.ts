import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {ProfileModule} from './profile/profile.module';
import {ResumeModule} from './resume/resume.module';
import {PortfolioModule} from './portfolio/portfolio.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,

    ProfileModule,
    ResumeModule,
    PortfolioModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
