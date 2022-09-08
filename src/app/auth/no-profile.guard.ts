import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NoProfileGuard implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router, private userService: UserService) {

  }
  canActivate() {
    return this.userService.getExist().pipe(
      tap(exist => {
        if (!exist) {
          this.router.navigate(['profile-creator']);
        }
      })
    )

  }

}
