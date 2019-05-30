import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../model/user';
import {UserService} from '../../../services/user.service';
import {NbDialogRef} from '@nebular/theme';
import {ToastService} from '../../../services/toast.service';

@Component({
  selector: 'nba-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {

  @Input() value: User;

  model: FormGroup;
  username: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(100),
  ]);
  confirmPassword: FormControl = new FormControl('');

  constructor(private userService: UserService,
              private dialogRef: NbDialogRef<UserFormComponent>,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.model = new FormGroup({
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
    }, {
      validators: [this.checkPassword],
    });
    if (this.value) {
      this.username.setValue(this.value.username);
      this.username.disable();
    }
  }

  submit() {
    if (this.model.valid) {
      if (this.value && this.value._id) {
        this.value.password = this.password.value;
        this.userService.update(this.value)
          .subscribe((data: { message: string }) => {
            this.toastService.success(data.message);
            this.dialogRef.close('success');
          }, (data) => {
            this.toastService.error(data.error.message);
          });
      } else {
        const user: User = {
          username: this.username.value,
          password: this.password.value,
        };
        this.userService.create(user)
          .subscribe((data: { message: string }) => {
            this.toastService.success(data.message);
            this.dialogRef.close('success');
          }, (data) => {
            this.toastService.error(data.error.message);
          });
      }
    }
  }

  checkPassword(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (confirmPassword.value && password.value && confirmPassword.value !== password.value) {
      confirmPassword.setErrors({equal: true});
    }
    return null;
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
