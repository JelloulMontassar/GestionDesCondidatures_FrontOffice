import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRestRoutingModule } from './password-rest-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../material-module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PasswordRestRoutingModule,
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
export class PasswordRestModule { }
