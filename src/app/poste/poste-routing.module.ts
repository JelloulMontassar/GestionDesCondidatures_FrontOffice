import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterPosteComponent } from './ajouter-poste/ajouter-poste.component';
import { ModifierPosteComponent } from './modifier-poste/modifier-poste.component';
import { PosteComponent } from './poste.component';
import { ViewPosteComponent } from './view-poste/view-poste.component';

const routes: Routes = [
  {
    path: '',
    component: PosteComponent
  },
  {
    path: 'addPoste',
    component: AjouterPosteComponent
  },
  {
    path: 'viewPoste/:id',
    component: ViewPosteComponent
  },
  {
    path: 'editPoste/:id',
    component: ModifierPosteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosteRoutingModule { }
