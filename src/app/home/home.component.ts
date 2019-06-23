import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Observer, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {

    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;

      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    });

    // const myNumbers = Observable.interval(1000)
    //   .map(
    //     (data: number) => {
    //       return data * 2;
    //     }
    //   );
    // this.numbersObsSubscription = myNumbers.subscribe(
    //   (number: number) => {
    //     console.log(number);
    //   }
    // );

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);
      setTimeout(() => {
        observer.next('second package');
      }, 4000);
      setTimeout(() => {
        // observer.error('this does not work');
        observer.complete();
      }, 5000);
      setTimeout(() => {
        observer.next('third package');
      }, 6000);
    });
    this.customObsSubscription = myObservable.subscribe(
      (data: string) => { console.log(data); },
      (error: string) => { console.log(error); },
      () => { console.log('completed'); }
    );
  }

  ngOnDestroy() {
    this.numbersObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }
}
