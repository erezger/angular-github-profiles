// auth-guard.service.ts
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService {

  constructor(
    public router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate(): boolean {
    const isLoggedIn = this.authenticationService.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
