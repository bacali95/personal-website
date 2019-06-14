import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from '@bacali/ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CategoryFormComponent} from './category-form/category-form.component';
import {CategoryListComponent} from './category-list/category-list.component';
import {NbDialogModule} from '@nebular/theme';

@NgModule({
  declarations: [
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
  ],
  entryComponents: [
    CategoryFormComponent,
  ],
})
export class CategoryModule {
}
