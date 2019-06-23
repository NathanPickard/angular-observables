import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private activatedSub: Subscription;

  // user1Activated = false;
  // user2Activated = false;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.activatedSub = this.usersService.activatedEmitter.subscribe(didActivate => {
      this.userActivated = didActivate;
    });
    // this.usersService.userActivated.subscribe(
    //   (id: number) => {
    //     if (id === 1) {
    //       this.user1Activated = true;
    //     } else if (id === 2) {
    //       this.user2Activated = true;
    //     }
    //   }
    // );

  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }
}
