import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';

import {  NbAuthModule, NbAuthJWTToken } from '@nebular/auth';

import { NbFirebaseAuthModule, NbFirebasePasswordStrategy, NbFirebaseGoogleStrategy } from '@nebular/firebase-auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbThemeModule, 
         NbLayoutModule,
         NbUserModule,
         NbSidebarModule,
         NbActionsModule,
         NbFormFieldModule,
         NbButtonModule,
         NbStepperModule,
         NbCardModule,
         NbInputModule,
         NbDatepickerModule,
        } from '@nebular/theme';


import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './pages/dashboard/header/header.component';
import { ProfileDataSteperComponent } from './pages/profile-data-steper/profile-data-steper.component';

import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from "./auth/login.guard";
import { NoProfileGuard } from './auth/no-profile.guard';
import { ExistProfileGuard } from './auth/exist-profile.guard';
import { ProfileComponent } from './dashboard/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ProfileDataSteperComponent,
    ProfileComponent,

    
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule, 
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    NbThemeModule.forRoot({ name: 'dark' }),
    NbEvaIconsModule,
    NbFirebaseAuthModule,
    NbAuthModule.forRoot({
      forms: {
        login: {
          strategy: 'password',
          rememberMe: true,
          socialLinks: [],
        },
        register: {
          strategy: 'password',
          terms: true,
          socialLinks: [],
        },
        logout: {
          strategy: 'password',
        },
        requestPassword: {
          strategy: 'password',
          socialLinks: [],
        },
        resetPassword: {
          strategy: 'password',
          socialLinks: [],
        },
        validation: {
          password: {
            required: true,
            minLength: 6,
            maxLength: 50,
          },
          email: {
            required: true,
          },
          fullName: {
            required: false,
            minLength: 4,
            maxLength: 50,
          },
        },
      },
      strategies: [
        NbFirebasePasswordStrategy.setup({
          name: 'password',
          login: {
            redirect: {
              success: 'pages/dashboard',
              failure: null, // stay on the same page
            },
            defaultErrors: ['Login/Email combination is not correct, please try again.'],
          },
          register: {
            redirect: {
              success: 'auth/login',
            },
          },
          logout: {
            redirect: {
              success: 'auth/login',
            },
          },
          requestPassword: {
            redirect: {
              success: 'auth/request-password',
            },
          },
          resetPassword: {
            redirect: {
              success: 'auth/reset-password',
            },
          },
          token: {
            class: NbAuthJWTToken,
            token: 'token'
            }
        }),
        NbFirebaseGoogleStrategy.setup({
          name: 'google',
        }),
      ],
    }),
    NbUserModule,
    NbLayoutModule,
    NbActionsModule,
    NbFormFieldModule,
    NbDatepickerModule.forRoot(),
    NbInputModule,
    NbButtonModule,
    NbSidebarModule.forRoot(),
    NbStepperModule,
    NbCardModule,
    
  ],
  providers: [AuthGuard, LoginGuard, { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }, ExistProfileGuard, NoProfileGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
