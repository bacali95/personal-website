import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortfolioComponent} from './portfolio.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {NbDatepickerModule, NbDialogModule} from '@nebular/theme';
import {Ng2SmartTableModule} from '@bacali/ng2-smart-table';
import {ProjectListComponent} from './project/project-list/project-list.component';
import {ProjectFormComponent} from './project/project-form/project-form.component';
import {CategoryFormComponent} from './category/category-form/category-form.component';
import {CategoryListComponent} from './category/category-list/category-list.component';

@NgModule({
  declarations: [
    PortfolioComponent,

    ProjectListComponent,
    ProjectFormComponent,

    CategoryListComponent,
    CategoryFormComponent,
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
    CategoryFormComponent,
    ProjectFormComponent,
  ],
})
export class PortfolioModule {
}
