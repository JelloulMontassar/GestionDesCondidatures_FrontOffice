import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusCandidatureRoutingModule } from './status-candidature-routing.module';
import { StatusCandidatureComponent } from './status-candidature.component';
import { ViewStatusCandidatureComponent } from './view-status-candidature/view-status-candidature.component';
import { AjouterStatusCandidatureComponent } from './ajouter-status-candidature/ajouter-status-candidature.component';
import { ModifierStatusCandidatureComponent } from './modifier-status-candidature/modifier-status-candidature.component';


@NgModule({
  declarations: [
    StatusCandidatureComponent,
    ViewStatusCandidatureComponent,
    AjouterStatusCandidatureComponent,
    ModifierStatusCandidatureComponent
  ],
  imports: [
    CommonModule,
    StatusCandidatureRoutingModule
  ]
})
export class StatusCandidatureModule { }
