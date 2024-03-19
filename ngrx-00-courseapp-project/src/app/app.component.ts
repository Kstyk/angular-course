import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { Store } from '@ngrx/store';
import { AppStateType } from './store/app.reducer';
import { autoLogin } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppStateType>,
    private loggingService: LoggingService
  ) {}

  ngOnInit() {
    this.store.dispatch(autoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
