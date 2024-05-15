import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from '../profile/profile.component';
import { AjouterProfileComponent } from './ajouter-profile/ajouter-profile.component';
import { ModifierProfileComponent } from './modifier-profile/modifier-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from 'src/material-module';


@NgModule({
  declarations: [
    ProfileComponent,
    AjouterProfileComponent,
    ModifierProfileComponent,
    ViewProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
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
export class ProfileModule { }
