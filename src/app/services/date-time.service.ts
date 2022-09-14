import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService implements OnDestroy {
 private displayDate: BehaviorSubject<any> = new BehaviorSubject(new Date())

  constructor() { }


  getToday() {
    return this.displayDate
  }

  getNext(d: Date) {
    this.displayDate.next(d.setDate(d.getDate() + 1))
  }

  getPrevious(d: Date) {
    this.displayDate.next(d.setDate(d.getDate() - 1))
  }

  emmitChange(event: any) {
    this.displayDate.next(event)
  }

  goToNow() {
    this.displayDate.next(Date.now())
  }

  ifNotToday(): Boolean {
    let result: Boolean = false;
    let now: Date = new Date()

    this.displayDate.subscribe((day: any) => {
      result = new Date(day).setHours(0, 0, 0, 0) != now.setHours(0, 0, 0, 0);
    })

    return result
  }

  ngOnDestroy(): void {
      this.displayDate.unsubscribe()
  }
}
