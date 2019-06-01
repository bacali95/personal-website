import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {CategoryListComponent} from './category/category-list/category-list.component';
import {ProjectListComponent} from './project/project-list/project-list.component';
import {ProjectFormComponent} from './project/project-form/project-form.component';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'user',
      component: UserListComponent,
    },
    {
      path: 'category',
      component: CategoryListComponent,
    },
    {
      path: 'project',
      loadChildren: 'app/pages/project/project.module#ProjectModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
