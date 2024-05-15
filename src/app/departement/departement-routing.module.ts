import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterDepartementComponent } from './ajouter-departement/ajouter-departement.component';
import { DepartementComponent } from './departement.component';
import { ModifierDepartementComponent } from './modifier-departement/modifier-departement.component';
import { ViewDepartementComponent } from './view-departement/view-departement.component';

const routes: Routes = [
  {
    path: '',
    component: DepartementComponent
  },
  {
    path: 'addDepartement',
    component: AjouterDepartementComponent
  },
  {
    path: 'viewDepartement/:id',
    component: ViewDepartementComponent
  },
  {
    path: 'editDepartement/:id',
    component: ModifierDepartementComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartementRoutingModule { }
