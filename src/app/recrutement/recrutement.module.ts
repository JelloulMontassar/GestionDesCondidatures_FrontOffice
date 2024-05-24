import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecrutementRoutingModule } from './recrutement-routing.module';
import { RecrutementComponent } from './recrutement.component';
import { ViewRecrutementComponent } from './view-recrutement/view-recrutement.component';
import { AjouterRecrutementComponent } from './ajouter-recrutement/ajouter-recrutement.component';
import { ModifierRecrutementComponent } from './modifier-recrutement/modifier-recrutement.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/material-module';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    RecrutementComponent,
    ViewRecrutementComponent,
    AjouterRecrutementComponent,
    ModifierRecrutementComponent
  ],
  imports: [
    CommonModule,
    RecrutementRoutingModule,
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
export class RecrutementModule { }
