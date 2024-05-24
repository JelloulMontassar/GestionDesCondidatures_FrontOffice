import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffreComponent } from './offre.component';
import { AjouterOffreComponent } from './ajouter-offre/ajouter-offre.component';
import { ViewOffreComponent } from './view-offre/view-offre.component';
import { ModifierOffreComponent } from './modifier-offre/modifier-offre.component';

const routes: Routes = [

  {
    path: '',
    component: OffreComponent
  },
  {
    path: 'addOffre',
    component: AjouterOffreComponent
  },
  {
    path: 'viewOffre/:id',
    component: ViewOffreComponent
  },
  {
    path: 'editOffre/:id',
    component: ModifierOffreComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffreRoutingModule { }
