import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosteRoutingModule } from './poste-routing.module';
import { PosteComponent } from '../poste/poste.component';
import { AjouterPosteComponent } from './ajouter-poste/ajouter-poste.component';
import { ViewPosteComponent } from './view-poste/view-poste.component';
import { ModifierPosteComponent } from './modifier-poste/modifier-poste.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/material-module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    PosteComponent,
    AjouterPosteComponent,
    ViewPosteComponent,
    ModifierPosteComponent
  ],
  imports: [
    CommonModule,
    PosteRoutingModule,
    SharedModule,
    MaterialModule,
    NgSelectModule ,
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
export class PosteModule { }
