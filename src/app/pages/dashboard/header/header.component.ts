import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: any;
  subscription: any;

  constructor(private authService: NbAuthService, private userService: UserService) {
    this.authService.onTokenChange()
      .subscribe((token) => {
        if (token.isValid()) {
          this.userService.getUser().subscribe(user => {
            this.user = user
          })
        }
      });

  }

}
