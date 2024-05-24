import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendrierRoutingModule } from './calendrier-routing.module';
import { CalendrierComponent } from './calendrier.component';
import { ViewCalendrierComponent } from './view-calendrier/view-calendrier.component';
import { AjouterCalendrierComponent } from './ajouter-calendrier/ajouter-calendrier.component';
import { ModifierCalendrierComponent } from './modifier-calendrier/modifier-calendrier.component';


@NgModule({
  declarations: [
    CalendrierComponent,
    ViewCalendrierComponent,
    AjouterCalendrierComponent,
    ModifierCalendrierComponent
  ],
  imports: [
    CommonModule,
    CalendrierRoutingModule
  ]
})
export class CalendrierModule { }
