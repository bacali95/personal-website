import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from '@bacali/ng2-smart-table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile.component';
import {NbDialogModule, NbIconModule} from '@nebular/theme';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [
    ProfileComponent,
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
  ],
})
export class ProfileModule {
}
