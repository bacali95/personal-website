import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {ResumeComponent} from './resume/resume.component';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {HomeComponent} from './home/home.component';
import {ShowProjectComponent} from './show-project/show-project.component';
import {OwlModule} from "ngx-owl-carousel";
import {ContactComponent} from "./contact/contact.component";

@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    ResumeComponent,
    PortfolioComponent,
    HomeComponent,
    ShowProjectComponent,
    ContactComponent
  ],
  imports: [
    OwlModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
