import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      }, 1000);
    });


    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;  
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
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

    // const myObservable = Observable.create((observer: Observer<string>) => {
    //   setTimeout(() => {
    //     observer.next('first package');
    //   }, 2000);
    //   setTimeout(() => {
    //     observer.next('second package');
    //   }, 4000);
    //   setTimeout(() => {
    //     // observer.error('this does not work');
    //     observer.complete();
    //   }, 5000);
    //   setTimeout(() => {
    //     observer.next('third package');
    //   }, 6000);
    // });

    // this.customObsSubscription = myObservable.subscribe(
    //   (data: string) => { console.log(data); },
    //   (error: string) => { console.log(error); },
    //   () => { console.log('completed'); }
    // );
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
    // this.numbersObsSubscription.unsubscribe();
    // this.customObsSubscription.unsubscribe();
  }
}
