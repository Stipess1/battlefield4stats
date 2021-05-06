import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { TosComponent } from './tos/tos.component';

const routes: Routes = [

  {
    path: 'details/:id/:nickname', component: DetailsComponent
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: 'tos', component: TosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
