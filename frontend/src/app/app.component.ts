/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAl6kyvWSpYjkSoBFITHNV405KYwcj_Cik',
    authDomain: 'personal-website-5f280.firebaseapp.com',
    databaseURL: 'https://personal-website-5f280.firebaseio.com',
    projectId: 'personal-website-5f280',
    storageBucket: 'personal-website-5f280.appspot.com',
    messagingSenderId: '62436799750',
    appId: '1:62436799750:web:f7dce196b96ebb65431a87',
    measurementId: 'G-PTJQ2GXSX0',
  });
}

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
