/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import {environment} from '../environments/environment';

if (!firebase.apps.length) {
  firebase.initializeApp(environment.firebase);
}

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
