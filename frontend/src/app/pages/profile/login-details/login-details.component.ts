import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {User} from '../../../model/user';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.scss'],
})
export class LoginDetailsComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Output() userUpdated: EventEmitter<User> = new EventEmitter();

  model: FormGroup;
  username: FormControl = new FormControl({value: '', disabled: true});
  password: FormControl = new FormControl('');
  confirmPassword: FormControl = new FormControl('');

  constructor() {
  }

  ngOnInit() {
    this.model = new FormGroup({
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
    }, {
      validators: [checkPassword],
    });
  }

  ngOnChanges() {
    if (this.model) {
      this.model.reset();
    }
    this.username.setValue(this.user.username);
    this.password.setValue('');
    this.confirmPassword.setValue('');
  }

  submit() {
    if (this.model.valid) {
      if (this.password.value !== '') {
        this.user.password = this.password.value;
      }
      this.userUpdated.emit(this.user);
    }
  }
}

function checkPassword(control: AbstractControl): { [key: string]: any } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (confirmPassword.value !== password.value) {
    confirmPassword.setErrors({notEqual: true});
  } else {
    confirmPassword.setErrors(null);
  }
  return null;
}
