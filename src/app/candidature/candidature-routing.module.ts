import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierCandidatureComponent } from './modifier-candidature/modifier-candidature.component';
import { ViewCandidatureComponent } from './view-candidature/view-candidature.component';
import { AjouterCandidatureComponent } from './ajouter-candidature/ajouter-candidature.component';
import { CandidatureComponent } from './candidature.component';

const routes: Routes = [
  
  {
    path: '',
    component: CandidatureComponent
  },
  {
    path: 'addPoste',
    component: AjouterCandidatureComponent
  },
  {
    path: 'viewPoste/:id',
    component: ViewCandidatureComponent
  },
  {
    path: 'editPoste/:id',
    component: ModifierCandidatureComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatureRoutingModule { }
