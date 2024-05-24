import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvenementRoutingModule } from './evenement-routing.module';
import { EvenementComponent } from './evenement.component';
import { AjouterEvenementComponent } from './ajouter-evenement/ajouter-evenement.component';
import { ModifierEvenementComponent } from './modifier-evenement/modifier-evenement.component';
import { ViewEvenementComponent } from './view-evenement/view-evenement.component';


@NgModule({
  declarations: [
    EvenementComponent,
    AjouterEvenementComponent,
    ModifierEvenementComponent,
    ViewEvenementComponent
  ],
  imports: [
    CommonModule,
    EvenementRoutingModule
  ]
})
export class EvenementModule { }
