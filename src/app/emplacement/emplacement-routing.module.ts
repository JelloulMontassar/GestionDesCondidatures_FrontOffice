import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmplacementComponent } from './emplacement.component';
import { AjouterEmplacementComponent } from './ajouter-emplacement/ajouter-emplacement.component';
import { ModifierEmplacementComponent } from './modifier-emplacement/modifier-emplacement.component';
import { ViewEmplacementComponent } from './view-emplacement/view-emplacement.component';
const routes: Routes = [
  {
    path: '',
    component: EmplacementComponent
  },
  {
    path: 'addEmplacement',
    component: AjouterEmplacementComponent
  },
  {
    path: 'viewEmplacement/:id',
    component: ViewEmplacementComponent
  },
  {
    path: 'editEmplacement/:id',
    component: ModifierEmplacementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmplacementRoutingModule { }
