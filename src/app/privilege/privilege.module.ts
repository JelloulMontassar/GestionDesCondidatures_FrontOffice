import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivilegeRoutingModule } from './privilege-routing.module';
import { PrivilegeComponent } from '../privilege/privilege.component';
import { AjouterPrivilegeComponent } from './ajouter-privilege/ajouter-privilege.component';
import { ViewPrivilegeComponent } from './view-privilege/view-privilege.component';
import { ModifierPrivilegeComponent } from './modifier-privilege/modifier-privilege.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/material-module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    PrivilegeComponent,
    AjouterPrivilegeComponent,
    ViewPrivilegeComponent,
    ModifierPrivilegeComponent
  ],
  imports: [
    CommonModule,
    PrivilegeRoutingModule,
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
export class PrivilegeModule { }
