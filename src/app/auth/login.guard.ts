import { Injectable } from '@angular/core';
import { CanActivate, Router, CanDeactivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild {

  constructor(private authService: NbAuthService, private router: Router) {

  }

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      map(auth => {
        return !auth
      }),
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['pages/dashboard']);
        }
      })

    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate()
  }




}