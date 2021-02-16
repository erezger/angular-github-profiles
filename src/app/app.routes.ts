// app.routes.ts
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuardService} from './services/auth-guard.service';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HomeComponent} from './components/dashboard/home/home.component';
import {ProfileComponent} from './components/dashboard/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuardService],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'github-profile', component: ProfileComponent},
    ]
  }
];

// tslint:disable-next-line:variable-name
export const Routing = RouterModule.forRoot(routes);
