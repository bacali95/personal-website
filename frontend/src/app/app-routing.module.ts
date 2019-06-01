import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule'},
  {path: '', redirectTo: 'pages', pathMatch: 'full'},
  {path: '**', redirectTo: 'pages'},
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
