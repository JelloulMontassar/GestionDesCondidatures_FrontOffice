import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieArticleRoutingModule } from './categorie-article-routing.module';
import { CategorieArticleComponent } from './categorie-article.component';
import { AjouterCategorieArticleComponent } from './ajouter-categorie-article/ajouter-categorie-article.component';
import { ModifierCategorieArticleComponent } from './modifier-categorie-article/modifier-categorie-article.component';
import { ViewCategorieArticleComponent } from './view-categorie-article/view-categorie-article.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from '../../material-module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    CategorieArticleComponent,
    AjouterCategorieArticleComponent,
    ModifierCategorieArticleComponent,
    ViewCategorieArticleComponent
  ],
  imports: [
    CommonModule,
    CategorieArticleRoutingModule,
    SharedModule,
   
    NgSelectModule,
    MaterialModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
  
export class CategorieArticleModule { }
