import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrepriseRoutingModule } from './entreprise-routing.module';
import { EntrepriseComponent } from '../entreprise/entreprise.component';
import { AjouterEntrepriseComponent } from './ajouter-entreprise/ajouter-entreprise.component';
import { ViewEntrepriseComponent } from './view-entreprise/view-entreprise.component';
import { ModifierEntrepriseComponent } from './modifier-entreprise/modifier-entreprise.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/material-module';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    EntrepriseComponent,
    AjouterEntrepriseComponent,
    ViewEntrepriseComponent,
    ModifierEntrepriseComponent
  ],
  imports: [
    CommonModule,
    EntrepriseRoutingModule,
    SharedModule,
    MaterialModule,
    ImageCropperModule,
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
export class EntrepriseModule { }
