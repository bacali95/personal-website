import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PortfolioComponent} from './portfolio.component';
import {CategoryListComponent} from './category/category-list/category-list.component';

const routes: Routes = [{
  path: '',
  component: PortfolioComponent,
  children: [
    {path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)},
    {path: 'category', component: CategoryListComponent},
    {path: '', redirectTo: 'project', pathMatch: 'full'},
    {path: '**', redirectTo: 'project'},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortfolioRoutingModule {
}
