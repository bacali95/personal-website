import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProjectFormComponent} from './project-form/project-form.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {NbDatepickerModule, NbDialogModule} from '@nebular/theme';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbDialogModule.forChild(),
    Ng2SmartTableModule,
    NbDatepickerModule,
  ],
  entryComponents: [
    ProjectFormComponent,
  ],
})
export class ProjectModule {
}
