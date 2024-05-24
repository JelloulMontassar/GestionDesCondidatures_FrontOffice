import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatRoutingModule } from './candidat-routing.module';
import { CandidatComponent } from './candidat.component';
import { AjouterCandidatComponent } from './ajouter-candidat/ajouter-candidat.component';
import { ModifierCandidatComponent } from './modifier-candidat/modifier-candidat.component';
import { ViewCandidatComponent } from './view-candidat/view-candidat.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from 'src/material-module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
   CandidatComponent,
    AjouterCandidatComponent,
    ModifierCandidatComponent,
    ViewCandidatComponent
  ],

  imports: [
    CommonModule,
    CandidatRoutingModule,
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




export class CandidatModule { }
