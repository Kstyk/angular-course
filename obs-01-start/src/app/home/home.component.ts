import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubs: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstObsSubs = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubs = customIntervalObservable
      .pipe(
        filter((count) => {
          return count > 0;
        }),
        map((count: number) => {
          return 'Round: ' + (count + 1);
        })
      )
      .subscribe(
        (count) => {
          console.log(count);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          console.log('Completed');
        }
      );
  }

  ngOnDestroy(): void {
    this.firstObsSubs.unsubscribe();
  }
}
