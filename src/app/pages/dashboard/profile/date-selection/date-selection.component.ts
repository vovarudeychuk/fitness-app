import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NbDatepickerComponent, NbDatepicker } from '@nebular/theme'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-selection',
  templateUrl: './date-selection.component.html',
  styleUrls: ['./date-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateSelectionComponent implements OnInit {
  date: Date = new Date()
  private displayDate: BehaviorSubject<any> = new BehaviorSubject(this.date)
  @ViewChild('dateInput') dateInput: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  getToday() {
    return this.displayDate
  }

  getNext() {
    this.displayDate.next(this.date.setDate(this.date.getDate() + 1))
  }

  getPrevious() {
    this.displayDate.next(this.date.setDate(this.date.getDate() - 1))
  }

  goToNow() {
    this.displayDate.next(Date.now())
  }

  emmitChange(event: any) {
    this.displayDate.next(event)
  }

  ifNotToday(): Boolean {
    let result: Boolean = false;
    let now: Date = new Date()

    this.displayDate.subscribe((day: any) => {
      result = new Date(day).setHours(0, 0, 0, 0) != now.setHours(0, 0, 0, 0);
    })

    return result
  }
}
