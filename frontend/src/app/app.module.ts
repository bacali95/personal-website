import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {MyServicesComponent} from './my-services/my-services.component';
import {MySkillsComponent} from './my-skills/my-skills.component';
import {MyEducationComponent} from './my-education/my-education.component';
import {MyClientsComponent} from './my-clients/my-clients.component';
import {TestimonialsComponent} from './testimonials/testimonials.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    MyServicesComponent,
    MySkillsComponent,
    MyEducationComponent,
    MyClientsComponent,
    TestimonialsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
