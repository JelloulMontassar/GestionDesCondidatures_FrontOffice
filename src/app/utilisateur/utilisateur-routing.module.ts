import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterUtilisateurComponent } from './ajouter-utilisateur/ajouter-utilisateur.component';
import { ModifierUtilisateurComponent } from './modifier-utilisateur/modifier-utilisateur.component';
import { UtilisateurComponent } from './utilisateur.component';
import { ViewUtilisateurComponent } from './view-utilisateur/view-utilisateur.component';

const routes: Routes = [

  {
    path: '',
    component: UtilisateurComponent
  },
  {
    path: 'addUtilisateur',
    component: AjouterUtilisateurComponent
  },
  {
    path: 'viewUtilisateur/:id',
    component: ViewUtilisateurComponent
  },
  {
    path: 'editUtilisateur/:id',
    component: ModifierUtilisateurComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
