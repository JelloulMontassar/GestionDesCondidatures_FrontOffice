import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatComponent } from './candidat.component';
import { AjouterCandidatComponent } from './ajouter-candidat/ajouter-candidat.component';
import { ViewCandidatComponent } from './view-candidat/view-candidat.component';
import { ModifierCandidatComponent } from './modifier-candidat/modifier-candidat.component';

const routes: Routes = [
  
  {
    path: '',
    component: CandidatComponent
  },
  {
    path: 'addCandidat',
    component: AjouterCandidatComponent
  },
  {
    path: 'viewCandidat/:id',
    component: ViewCandidatComponent
  },
  {
    path: 'modifierCandidat/:id',
    component: ModifierCandidatComponent
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatRoutingModule { }
