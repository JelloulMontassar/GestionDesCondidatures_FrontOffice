import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

// // for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// // for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// // for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AdminGuard } from './shared/guard/admin.guard';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { MaterialModule } from '../material-module';
import { PasswordRestComponent } from './password-rest/password-rest.component';
import { MatIconModule } from '@angular/material/icon';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import { JobDetailsComponent } from './jobdetails/jobdetails.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { SignupStepTwoComponent } from './signup-step-two/signup-step-two.component';
import { ProfileCandidatComponent } from './profile-candidat/profile-candidat.component';
import { CandidateDetailsDialogComponent } from './candidate-details-dialog/candidate-details-dialog.component';
import { DatePickerDialogComponent } from './date-picker-dialog/date-picker-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordRestComponent,
    HomeComponent,
    JobDetailsComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    SignupStepTwoComponent,
    ProfileCandidatComponent,
    CandidateDetailsDialogComponent,
    DatePickerDialogComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),

    //     // for HttpClient use:
    LoadingBarHttpClientModule,
    //     // for Router use:
    LoadingBarRouterModule,
    //     // for Core use:
    LoadingBarModule,
  ],
  providers: [AdminGuard, CookieService ,{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
