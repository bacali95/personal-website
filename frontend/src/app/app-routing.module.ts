import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutMeComponent} from "./about-me/about-me.component";
import {ResumeComponent} from "./resume/resume.component";
import {PortfolioComponent} from "./portfolio/portfolio.component";
import {HomeComponent} from "./home/home.component";
import {ShowProjectComponent} from "./show-project/show-project.component";
import {ContactComponent} from "./contact/contact.component";

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {
    path: 'index', component: HomeComponent, children: [
      {path: '', redirectTo: 'about', pathMatch: 'full'},
      {path: 'about', component: AboutMeComponent},
      {path: 'resume', component: ResumeComponent},
      {path: 'portfolio', component: PortfolioComponent},
      {path: 'contact', component: ContactComponent}
    ]
  },
  {path: 'project/:id', component: ShowProjectComponent},
  {path: '**', redirectTo: 'index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
