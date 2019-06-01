import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProjectFormComponent} from './project-form/project-form.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {NbDatepickerModule, NbDialogModule} from '@nebular/theme';
import {ProjectRoutingModule} from './project-routing.module';
import { ProjectComponent } from './project.component';

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
