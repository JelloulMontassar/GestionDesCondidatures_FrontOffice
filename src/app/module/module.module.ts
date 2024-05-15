import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleComponent } from '../module/module.component';
import { AjouterModuleComponent } from './ajouter-module/ajouter-module.component';
import { ViewModuleComponent } from './view-module/view-module.component';
import { ModifierModuleComponent } from './modifier-module/modifier-module.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ModuleComponent,
    AjouterModuleComponent,
    ViewModuleComponent,
    ModifierModuleComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    SharedModule,
     RouterModule
  ]
})
export class ModuleModule { }
