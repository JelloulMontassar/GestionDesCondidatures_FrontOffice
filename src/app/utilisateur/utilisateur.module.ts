import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { UtilisateurComponent } from '../utilisateur/utilisateur.component';
import { AjouterUtilisateurComponent } from './ajouter-utilisateur/ajouter-utilisateur.component';
import { ModifierUtilisateurComponent } from './modifier-utilisateur/modifier-utilisateur.component';
import { ViewUtilisateurComponent } from './view-utilisateur/view-utilisateur.component';
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
    UtilisateurComponent,
    AjouterUtilisateurComponent,
    ModifierUtilisateurComponent,
    ViewUtilisateurComponent
  ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
    SharedModule,
    MaterialModule,
    NgSelectModule ,

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
export class UtilisateurModule { }
