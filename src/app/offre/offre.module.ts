import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffreRoutingModule } from './offre-routing.module';
import { OffreComponent } from './offre.component';
import { ViewOffreComponent } from './view-offre/view-offre.component';
import { AjouterOffreComponent } from './ajouter-offre/ajouter-offre.component';
import { ModifierOffreComponent } from './modifier-offre/modifier-offre.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/material-module';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    OffreComponent,
    ViewOffreComponent,
    AjouterOffreComponent,
    ModifierOffreComponent
  ],
  imports: [
    CommonModule,
    OffreRoutingModule,
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


export class OffreModule { }
