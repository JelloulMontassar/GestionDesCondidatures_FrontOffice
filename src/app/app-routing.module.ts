import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ContentComponent } from "./shared/components/layout/content/content.component";
import { FullComponent } from "./shared/components/layout/full/full.component";
import { full } from "./shared/routes/full.routes";
import { content } from "./shared/routes/routes";

import { AdminGuard } from './shared/guard/admin.guard';
import {HomeComponent} from "./home/home.component";
import {JobDetailsComponent} from "./jobdetails/jobdetails.component";
import {SignupComponent} from "./signup/signup.component";
import { SignupStepTwoComponent } from './signup-step-two/signup-step-two.component';
import { ProfileCandidatComponent } from './profile-candidat/profile-candidat.component';

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'job-details/:id',
    component: JobDetailsComponent,
  },
  {
    path: "SignUp",
    component : SignupComponent
  },
  {
    path: 'Signup-step-two',
    component: SignupStepTwoComponent
  },
  {
    path: 'user/candidat/:id',
    component: ProfileCandidatComponent,
  },
  {
    path: 'admin',
    component: ContentComponent,
    canActivate: [AdminGuard],
    children: content
  },
    {
        path: '',
        redirectTo: '/home'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
