import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailTypeUsagerComponent } from './detail-type-usager.component';
import { AjouterDetailTypeUsagerComponent } from './ajouter-detail-type-usager/ajouter-detail-type-usager.component';
import { ViewDetailTypeUsagerComponent } from './view-detail-type-usager/view-detail-type-usager.component';
import { ModifierDetailTypeUsagerComponent } from './modifier-detail-type-usager/modifier-detail-type-usager.component';

const routes: Routes = [
  {
    path: '',
    component: DetailTypeUsagerComponent
  },
  {
    path: 'addCategorieTypeUsager',
    component: AjouterDetailTypeUsagerComponent
  },
  {
    path: 'viewCategorieTypeUsager/:id',
    component: ViewDetailTypeUsagerComponent
  },
  {
    path: 'editCategorieTypeUsager/:id',
    component: ModifierDetailTypeUsagerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailTypeUsagerRoutingModule { }
