import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterDomaineComponent } from './ajouter-domaine/ajouter-domaine.component';
import { DomaineComponent } from './domaine.component';
import { ModifierDomaineComponent } from './modifier-domaine/modifier-domaine.component';
import { ViewDomaineComponent } from './view-domaine/view-domaine.component';

const routes: Routes = [
  {
    path: '',
    component: DomaineComponent
  },
  {
    path: 'addDomaine',
    component: AjouterDomaineComponent
  },
  {
    path: 'viewDomaine/:id',
    component: ViewDomaineComponent
  },
  {
    path: 'editDomaine/:id',
    component: ModifierDomaineComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomaineRoutingModule { }
