import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectFormComponent} from './project-form/project-form.component';
import {ProjectComponent} from './project.component';

const routes: Routes = [{
  path: '',
  component: ProjectComponent,
  children: [
    {
      path: '',
      component: ProjectListComponent,
    },
    {
      path: 'add',
      component: ProjectFormComponent,
    },
    {
      path: 'edit/:id',
      component: ProjectFormComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {
}
