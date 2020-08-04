import {Component} from '@angular/core';
import {NbAuthJWTToken, NbAuthService, NbTokenStorage} from '@nebular/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private readonly authService: NbAuthService,
    private readonly tokenStorage: NbTokenStorage,
    private readonly router: Router,
  ) {}

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        const { user } = result;
        if (user.email === 'nasreddine.bacali95@gmail.com') {
          const token = await user.getIdToken(true);
          this.tokenStorage.set(new NbAuthJWTToken(token, 'firebase', new Date()));
          return this.router.navigate(['pages']);
        }
      });
  }
}
