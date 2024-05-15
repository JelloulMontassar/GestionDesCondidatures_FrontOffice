import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterModuleComponent } from './ajouter-module/ajouter-module.component';
import { ModifierModuleComponent } from './modifier-module/modifier-module.component';
import { ModuleComponent } from './module.component';
import { ViewModuleComponent } from './view-module/view-module.component';

const routes: Routes = [

  {
    path: '',
    component: ModuleComponent
  },
  {
    path: 'addModule',
    component: AjouterModuleComponent
  },
  {
    path: 'viewModule/:id',
    component: ViewModuleComponent
  },
  {
    path: 'editModule/:id',
    component: ModifierModuleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
