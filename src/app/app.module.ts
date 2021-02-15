// app.module.ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {Routing} from './app.routes';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';

import {AuthenticationGuardService} from './services/auth-guard.service';
import {AuthenticationService} from './services/auth.service';

import {AuthenticationEffects} from './store/effects/auth.effects';
import {reducers} from './store/app.states';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    EffectsModule.forRoot([AuthenticationEffects]),
    StoreModule.forRoot(reducers, {})
  ],
  providers: [
    AuthenticationGuardService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
