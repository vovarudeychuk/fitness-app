import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './auth/auth.guard';
import { ExistProfileGuard } from './auth/exist-profile.guard';
import { LoginGuard } from './auth/login.guard';
import { NoProfileGuard } from './auth/no-profile.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileDataSteperComponent } from './pages/profile-data-steper/profile-data-steper.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pages',
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    canActivateChild: [LoginGuard],
    children: [
      // {
      //   path: '**',
      //   pathMatch: 'full',
      //   redirectTo: 'login',
      // },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  {
    path: 'logout',
    component: NbLogoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    canActivate: [AuthGuard, NoProfileGuard],
    children: [
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      }
    ]
  },
  {
    path: 'profile-creator',
    canActivate: [AuthGuard, ExistProfileGuard],
    component: ProfileDataSteperComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
