import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  
  public user: any;
  value = 70;

  constructor(private userService: UserService) { 

  }

  getPieData() {
    let pData = [
      {
        "name": "Protein",
        "value": 800
      },
      {
        "name": "Fat",
        "value": 400
      },
      {
        "name": "Carb",
        "value": 800
      },
    ];
    return pData
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe( user => {
      this.user = user
    })
  }

  getPercentProm(num: number, tall: number) {
    return this.normalizeNumber(num / 100 * tall)
  }

  normalizeNumber(num: number) {
    return Math.floor(num)
  }

  get status() {
    if (this.value <= 25) {
      return 'danger';
    } else if (this.value <= 50) {
      return 'warning';
    } else if (this.value <= 75) {
      return 'info';
    } else {
      return 'success';
    }
  }



}
