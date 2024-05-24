import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecrutementComponent } from './recrutement.component';
import { AjouterRecrutementComponent } from './ajouter-recrutement/ajouter-recrutement.component';
import { ViewRecrutementComponent } from './view-recrutement/view-recrutement.component';
import { ModifierRecrutementComponent } from './modifier-recrutement/modifier-recrutement.component';

const routes: Routes = [

  
  {
    path: '',
    component: RecrutementComponent
  },
  {
    path: 'addPoste',
    component: AjouterRecrutementComponent
  },
  {
    path: 'viewPoste/:id',
    component: ViewRecrutementComponent
  },
  {
    path: 'editPoste/:id',
    component: ModifierRecrutementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecrutementRoutingModule { }
