import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomaineRoutingModule } from './domaine-routing.module';
import { DomaineComponent } from '../domaine/domaine.component';
import { AjouterDomaineComponent } from './ajouter-domaine/ajouter-domaine.component';
import { ViewDomaineComponent } from './view-domaine/view-domaine.component';
import { ModifierDomaineComponent } from './modifier-domaine/modifier-domaine.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/material-module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    DomaineComponent,
    AjouterDomaineComponent,
    ViewDomaineComponent,
    ModifierDomaineComponent
  ],
  imports: [
    CommonModule,
    DomaineRoutingModule,
    SharedModule,
    MaterialModule,
    ImageCropperModule,
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
export class DomaineModule { }
