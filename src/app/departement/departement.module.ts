import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartementRoutingModule } from './departement-routing.module';
import { DepartementComponent } from '../departement/departement.component';
import { AjouterDepartementComponent } from './ajouter-departement/ajouter-departement.component';
import { ViewDepartementComponent } from './view-departement/view-departement.component';
import { ModifierDepartementComponent } from './modifier-departement/modifier-departement.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/material-module';


@NgModule({
  declarations: [
    DepartementComponent,
    AjouterDepartementComponent,
    ViewDepartementComponent,
    ModifierDepartementComponent
  ],
  imports: [
    CommonModule,
    DepartementRoutingModule,
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
export class DepartementModule { }
