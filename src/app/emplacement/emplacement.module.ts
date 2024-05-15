import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmplacementRoutingModule } from './emplacement-routing.module';
import { EmplacementComponent } from '../emplacement/emplacement.component';
import { AjouterEmplacementComponent } from './ajouter-emplacement/ajouter-emplacement.component';
import { ViewEmplacementComponent } from './view-emplacement/view-emplacement.component';
import { ModifierEmplacementComponent } from './modifier-emplacement/modifier-emplacement.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../material-module';

@NgModule({
  declarations: [
    EmplacementComponent,
    AjouterEmplacementComponent,
    ViewEmplacementComponent,
    ModifierEmplacementComponent
  ],
  imports: [
    CommonModule,
    EmplacementRoutingModule,
    SharedModule,
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
export class EmplacementModule { }
