import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from '@bacali/ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile.component';
import {NbDatepickerModule, NbDialogModule, NbIconModule} from '@nebular/theme';
import {ImageCropperModule} from 'ngx-image-cropper';
import {LoginDetailsComponent} from './login-details/login-details.component';
import {GeneralDetailsComponent} from './general-details/general-details.component';
import { EducationDetailsComponent } from './education-details/education-details.component';

@NgModule({
  declarations: [
    ProfileComponent,
    LoginDetailsComponent,
    GeneralDetailsComponent,
    EducationDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    ThemeModule,
    NbDialogModule.forChild(),
    Ng2SmartTableModule,
    NbIconModule,
    NbDatepickerModule,
  ],
})
export class ProfileModule {
}
