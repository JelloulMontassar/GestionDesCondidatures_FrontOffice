import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterProfileComponent } from './ajouter-profile/ajouter-profile.component';
import { ModifierProfileComponent } from './modifier-profile/modifier-profile.component';
import { ProfileComponent } from './profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [

  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'addProfile',
    component: AjouterProfileComponent
  },
  {
    path: 'viewProfile/:id',
    component: ViewProfileComponent
  },
  {
    path: 'editProfile/:id',
    component: ModifierProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
