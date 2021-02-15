// app.routes.ts
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuardService} from './services/auth-guard.service';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuardService]}
];

export const Routing = RouterModule.forRoot(routes);
