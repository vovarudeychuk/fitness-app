import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NbDatepickerComponent, NbDatepicker } from '@nebular/theme'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateTimeService } from 'src/app/services/date-time.service';

@Component({
  selector: 'app-date-selection',
  templateUrl: './date-selection.component.html',
  styleUrls: ['./date-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateSelectionComponent implements OnInit {
  date: Date = new Date()

  constructor(private dateService: DateTimeService) {
  }

  ngOnInit(): void {

  }


  getToday() {
    return this.dateService.getToday()
  }

  getNext(d: Date) {
    this.dateService.getNext(d)
  }

  getPrevious(d: Date) {
    this.dateService.getPrevious(d)
  }

  goToNow() {
    this.date = new Date()
    this.dateService.goToNow()
  }

  emmitChange(event: any) {
    this.dateService.emmitChange(event)
  }

  ifNotToday(): Boolean {
    return this.dateService.ifNotToday()
  }
}
