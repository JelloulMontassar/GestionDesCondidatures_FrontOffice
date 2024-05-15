import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { AjouterArticleComponent } from './ajouter-article/ajouter-article.component';
import { ModifierArticleComponent } from './modifier-article/modifier-article.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from '../../material-module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    ArticleComponent,
    AjouterArticleComponent,
    ModifierArticleComponent,
    ViewArticleComponent
  ],

  imports: [
    CommonModule,
    ArticleRoutingModule,
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

export class ArticleModule {
}



