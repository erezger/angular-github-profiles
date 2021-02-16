// app.module.ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {Routing} from './app.routes';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/dashboard/home/home.component';
import {ProfileComponent} from './components/dashboard/profile/profile.component';

import {AuthenticationGuardService} from './services/auth-guard.service';
import {AuthenticationService} from './services/auth.service';

import {AuthenticationEffects} from './store/effects/auth.effects';
import {reducers} from './store/app.states';
import {ProfileService} from './services/profile.service';
import {ProfileEffects} from './store/effects/profile.effects';
import {HttpClientModule} from '@angular/common/http';
import {SidebarComponent} from './components/dashboard/sidebar/sidebar.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthenticationEffects, ProfileEffects]),
    StoreModule.forRoot(reducers, {})
  ],
  providers: [
    AuthenticationGuardService,
    AuthenticationService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
