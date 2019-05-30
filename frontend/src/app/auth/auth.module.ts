import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule} from '@nebular/theme';
import {NgxAuthRoutingModule} from './auth-routing.module';
import {NbAuthModule} from '@nebular/auth';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule,
    NbAuthModule,
    CommonModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
  ],
})
export class AuthModule {
}
