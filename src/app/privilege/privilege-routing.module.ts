import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterPrivilegeComponent } from './ajouter-privilege/ajouter-privilege.component';
import { ModifierPrivilegeComponent } from './modifier-privilege/modifier-privilege.component';
import { PrivilegeComponent } from './privilege.component';
import { ViewPrivilegeComponent } from './view-privilege/view-privilege.component';

const routes: Routes = [
  {
    path: '',
    component: PrivilegeComponent
  },
  {
    path: 'addPrivilege',
    component: AjouterPrivilegeComponent
  },
  {
    path: 'viewPrivilege/:id',
    component: ViewPrivilegeComponent
  },
  {
    path: 'editPrivilege/:id',
    component: ModifierPrivilegeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivilegeRoutingModule { }
