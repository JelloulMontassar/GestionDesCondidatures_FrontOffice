import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatureRoutingModule } from './candidature-routing.module';
import { CandidatureComponent } from './candidature.component';
import { ModifierCandidatureComponent } from './modifier-candidature/modifier-candidature.component';
import { AjouterCandidatureComponent } from './ajouter-candidature/ajouter-candidature.component';
import { ViewCandidatureComponent } from './view-candidature/view-candidature.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/material-module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    CandidatureComponent,
    ModifierCandidatureComponent,
    AjouterCandidatureComponent,
    ViewCandidatureComponent
  ],
  imports: [
    CommonModule,
    CandidatureRoutingModule,
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
export class CandidatureModule { }
