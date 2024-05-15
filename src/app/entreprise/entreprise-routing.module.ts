import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterEntrepriseComponent } from './ajouter-entreprise/ajouter-entreprise.component';
import { EntrepriseComponent } from './entreprise.component';
import { ModifierEntrepriseComponent } from './modifier-entreprise/modifier-entreprise.component';
import { ViewEntrepriseComponent } from './view-entreprise/view-entreprise.component';

const routes: Routes = [

  {
    path: '',
    component: EntrepriseComponent
  },
  {
    path: 'addEntreprise',
    component: AjouterEntrepriseComponent
  },
  {
    path: 'viewEntreprise/:id',
    component: ViewEntrepriseComponent
  },
  {
    path: 'editEntreprise/:id',
    component: ModifierEntrepriseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepriseRoutingModule { }
