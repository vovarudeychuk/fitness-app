import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

// export interface User {
//   name?: string
//   token?: NbAuthJWTToken
//   picture?: string
// }

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
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

  ngOnInit(): void {

  }


}
