import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntretienRoutingModule } from './entretien-routing.module';
import { EntretienComponent } from './entretien.component';
import { ModifierEntretienComponent } from './modifier-entretien/modifier-entretien.component';
import { ViewEntretienComponent } from './view-entretien/view-entretien.component';
import { AjouterEntretienComponent } from './ajouter-entretien/ajouter-entretien.component';


@NgModule({
  declarations: [
    EntretienComponent,
    ModifierEntretienComponent,
    ViewEntretienComponent,
    AjouterEntretienComponent
  ],
  imports: [
    CommonModule,
    EntretienRoutingModule
  ]
})
export class EntretienModule { }
