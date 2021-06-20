import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TosComponent } from './tos/tos.component';

const routes: Routes = [

  {
    path: 'details/:id/:nickname/:platform', component: DetailsComponent
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: 'tos', component: TosComponent
  },
  {
    path: 'privacy-policy', component: PrivacyPolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
