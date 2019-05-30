/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeModule} from './@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule,
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'name',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          baseEndpoint: '/api',
          login: {
            endpoint: '/auth/login',
            method: 'post',
          },
          logout: {
            endpoint: '/auth/logout',
            method: 'get',
          },
          errors: {
            getter: (module, res, options) => {
              return res.error || options[module].defaultErrors;
            },
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 500,
          strategy: 'name',
          rememberMe: false,
          showMessages: {
            success: false,
            error: true,
          },
        },
        logout: {
          redirectDelay: 0,
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/admin'},
  ],
})
export class AppModule {
}
