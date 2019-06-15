import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProjectRoutingModule} from './project-routing.module';
import {ThemeModule} from '../../../@theme/theme.module';
import {NbDatepickerModule, NbDialogModule} from '@nebular/theme';
import {Ng2SmartTableModule} from '@bacali/ng2-smart-table';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectFormComponent} from './project-form/project-form.component';
import {ProjectComponent} from './project.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectFormComponent,
    ProjectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    ThemeModule,
    NbDialogModule.forChild(),
    Ng2SmartTableModule,
    NbDatepickerModule,
  ],
})
export class ProjectModule {
}
