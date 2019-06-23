import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class UsersService {
  // activatedEmitter = new EventEmitter<boolean>();
  // userActivated = new Subject();
  activatedEmitter = new Subject<boolean>();
}