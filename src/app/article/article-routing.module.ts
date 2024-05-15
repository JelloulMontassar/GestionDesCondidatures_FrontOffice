import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article.component';
import { AjouterArticleComponent } from './ajouter-article/ajouter-article.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { ModifierArticleComponent } from './modifier-article/modifier-article.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent
  },
  {
    path: 'addArticle',
    component: AjouterArticleComponent
  },
  {
    path: 'viewArticle/:id',
    component: ViewArticleComponent
  },
  {
    path: 'editArticle/:id',
    component: ModifierArticleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
