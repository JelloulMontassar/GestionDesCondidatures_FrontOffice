import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailTypeUsagerRoutingModule } from './detail-type-usager-routing.module';
import { DetailTypeUsagerComponent } from './detail-type-usager.component';
import { ViewDetailTypeUsagerComponent } from './view-detail-type-usager/view-detail-type-usager.component';
import { ModifierDetailTypeUsagerComponent } from './modifier-detail-type-usager/modifier-detail-type-usager.component';
import { AjouterDetailTypeUsagerComponent } from './ajouter-detail-type-usager/ajouter-detail-type-usager.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from '../../material-module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    DetailTypeUsagerComponent,
    ViewDetailTypeUsagerComponent,
    ModifierDetailTypeUsagerComponent,
    AjouterDetailTypeUsagerComponent
  ],
  imports: [
    CommonModule,
    DetailTypeUsagerRoutingModule,
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
export class DetailTypeUsagerModule { }
