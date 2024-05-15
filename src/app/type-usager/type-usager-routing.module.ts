import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeUsagerComponent } from './type-usager.component';
import { AjouterTypeUsagerComponent } from './ajouter-type-usager/ajouter-type-usager.component';
import { ViewTypeUsagerComponent } from './view-type-usager/view-type-usager.component';
import { ModifierTypeUsagerComponent } from './modifier-type-usager/modifier-type-usager.component';


const routes: Routes = [
  {
    path: '',
    component: TypeUsagerComponent
  },
  {
    path: 'addTypeUsager',
    component: AjouterTypeUsagerComponent
  },
  {
    path: 'viewTypeUsager/:id',
    component: ViewTypeUsagerComponent
  },
  {
    path: 'editTypeUsager/:id',
    component: ModifierTypeUsagerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeUsagerRoutingModule { }
