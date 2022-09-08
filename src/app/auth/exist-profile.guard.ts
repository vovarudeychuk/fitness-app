import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ExistProfileGuard implements CanActivate {
  constructor(private authService: NbAuthService, private router: Router, private userService: UserService) {

  }

  canActivate() {
    return this.userService.getExist().pipe(
      map(isExist => {
        return !isExist
      }),
      tap(exist => {
        if (!exist) {
          this.router.navigate(['pages/dashboard']);
        }
      })
    );

  }

}
