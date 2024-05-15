import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeUsagerComponent } from './type-usager.component';
import { ViewTypeUsagerComponent } from './view-type-usager/view-type-usager.component';
import { ModifierTypeUsagerComponent } from './modifier-type-usager/modifier-type-usager.component';
import { AjouterTypeUsagerComponent } from './ajouter-type-usager/ajouter-type-usager.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from '../../material-module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { TypeUsagerRoutingModule } from './type-usager-routing.module';


@NgModule({
  declarations: [
    TypeUsagerComponent,
    ViewTypeUsagerComponent,
    ModifierTypeUsagerComponent,
    AjouterTypeUsagerComponent
  ],
  imports: [
    CommonModule,
    TypeUsagerRoutingModule,
    SharedModule,
    NgSelectModule,
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
export class TypeUsagerModule { }
