import { Component, OnDestroy, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Observable, Subscription, generate, interval } from 'rxjs';
=======
import { Observable, Subscription, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
>>>>>>> 2e812cbad88f64a1925e0940416426044fbf720b

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

    const result = generate(
      0,
      (x) => x < 3,
      (x) => x + 1,
      (x) => x
    );

    result.subscribe((x) => console.log(x));

    // const customIntervalObservable = new Observable((observer) => {
    //   let count = 0;
    //   observer.next('start');
    //   setInterval(() => {
    //     observer.next(count);
    //     count++;
    //     observer.next('----');
    //   }, 1000);
    // });

    // this.firstObsSubs = customIntervalObservable.subscribe((count) => {
    //   console.log(count);
    // });
  }

  ngOnDestroy(): void {
    this.firstObsSubs.unsubscribe();
  }
}
