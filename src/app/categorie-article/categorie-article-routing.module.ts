import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifierCategorieArticleComponent } from './modifier-categorie-article/modifier-categorie-article.component';
import { ViewCategorieArticleComponent } from './view-categorie-article/view-categorie-article.component';
import { AjouterCategorieArticleComponent } from './ajouter-categorie-article/ajouter-categorie-article.component';
import { CategorieArticleComponent } from './categorie-article.component';

const routes: Routes = [
  {
    path: '',
    component: CategorieArticleComponent
  },
  {
    path: 'addCategorieArticle',
    component: AjouterCategorieArticleComponent
  },
  {
    path: 'viewCategorieArticle/:id',
    component: ViewCategorieArticleComponent
  },
  {
    path: 'editCategorieArticle/:id',
    component: ModifierCategorieArticleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorieArticleRoutingModule { }
