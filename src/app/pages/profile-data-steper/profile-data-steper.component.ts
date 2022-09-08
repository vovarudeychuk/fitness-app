import { NodeWithI18n } from '@angular/compiler';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { NbDatepickerDirective } from '@nebular/theme';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile-data-steper',
  templateUrl: './profile-data-steper.component.html',
  styleUrls: ['./profile-data-steper.component.scss']
})
export class ProfileDataSteperComponent implements OnInit, AfterContentInit {
  nameForm: FormGroup;
  ageForm: FormGroup;
  tallWeightForm: FormGroup;


  dateTtimeDefault:  any;
  tallDefault: Number = 170;
  weightDefault: Number = 80;
  

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.nameForm = this.fb.group({
      nameCtrl: ['', Validators.required],
    });

    this.ageForm = this.fb.group({
      ageCtrl: [this.dateTtimeDefault, Validators.required],
    });

    this.tallWeightForm = this.fb.group({
      sizeCtrl: [this.tallDefault, Validators.required],
      weightCtrl: [this.weightDefault, Validators.required]
    });

   }

  ngOnInit() {


  }

  ngAfterContentInit(): void {

  }

  onFirstSubmit() {
    this.nameForm.markAsDirty();
  }

  onSecondSubmit() {
    this.ageForm.markAsDirty();
  }

  onThirdSubmit() {
    this.tallWeightForm.markAsDirty();

  }

  onConfirm() {
    let userData: User = {
      name: this.nameForm.value.nameCtrl,
      birthDay: this.ageForm.value.ageCtrl,
      tall: this.tallWeightForm.value.sizeCtrl,
      weight: this.tallWeightForm.value.weightCtrl
    }

    this.userService.addUser(userData)
    this.router.navigate(['pages/dashboard'])
    
  
  }

}
