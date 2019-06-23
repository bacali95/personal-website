import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResumeComponent} from './resume.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {NbDialogModule} from '@nebular/theme';
import {Ng2SmartTableModule} from '@bacali/ng2-smart-table';
import {EducationListComponent} from './education/education-list/education-list.component';
import {EducationFormComponent} from './education/education-form/education-form.component';
import {SkillFormComponent} from './skill/skill-form/skill-form.component';
import {SkillListComponent} from './skill/skill-list/skill-list.component';
import {SkillValueComponent} from './skill/skill-list/skill-value/skill-value.component';
import {AssetFormComponent} from './asset/asset-form/asset-form.component';
import {AssetListComponent} from './asset/asset-list/asset-list.component';

@NgModule({
  declarations: [
    ResumeComponent,

    EducationListComponent,
    EducationFormComponent,

    SkillListComponent,
    SkillFormComponent,
    SkillValueComponent,

    AssetFormComponent,
    AssetListComponent,
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
    EducationFormComponent,

    SkillFormComponent,
    SkillValueComponent,

    AssetFormComponent,
  ],
})
export class ResumeModule {
}
