import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, generate, interval } from 'rxjs';

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
