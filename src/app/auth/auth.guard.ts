import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: NbAuthService, private router: Router, private userService: UserService) {
  }

  canActivate() {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['auth/login'])
          }
        }),
      )

  }

  canActivateChild() {
    return this.canActivate()
  }

}