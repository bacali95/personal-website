import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {User} from '../../../model/user';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: ' general-details',
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.scss'],
})
export class GeneralDetailsComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Output() userUpdated: EventEmitter<User> = new EventEmitter();

  model: FormGroup;
  firstName: FormControl = new FormControl();
  lastName: FormControl = new FormControl();
  birthdayDate: FormControl = new FormControl();
  birthdayPlace: FormControl = new FormControl();
  nationality: FormControl = new FormControl();
  profession: FormControl = new FormControl();
  maritalStatus: FormControl = new FormControl();
  skype: FormControl = new FormControl();
  intro: FormControl = new FormControl();
  address: FormControl = new FormControl();
  email: FormControl = new FormControl();
  phone: FormControl = new FormControl();
  website: FormControl = new FormControl();

  constructor() {
  }

  ngOnInit() {
    this.model = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      birthdayDate: this.birthdayDate,
      birthdayPlace: this.birthdayPlace,
      nationality: this.nationality,
      profession: this.profession,
      maritalStatus: this.maritalStatus,
      skype: this.skype,
      intro: this.intro,
      address: this.address,
      email: this.email,
      phone: this.phone,
      website: this.website,
    });
  }

  ngOnChanges() {
    if (this.model) {
      this.model.reset();
    }
    this.firstName.setValue(this.user.firstName);
    this.lastName.setValue(this.user.lastName);
    this.birthdayDate.setValue(this.user.birthday ? new Date(this.user.birthday.date) : new Date());
    this.birthdayPlace.setValue(this.user.birthday ? this.user.birthday.place : '');
    this.nationality.setValue(this.user.nationality);
    this.profession.setValue(this.user.profession);
    this.maritalStatus.setValue(this.user.maritalStatus);
    this.skype.setValue(this.user.skype);
    this.intro.setValue(this.user.intro);
    this.address.setValue(this.user.address);
    this.email.setValue(this.user.email);
    this.phone.setValue(this.user.phone);
    this.website.setValue(this.user.website);
  }

  submit() {
    if (this.model.valid) {
      this.user.firstName = this.firstName.value;
      this.user.lastName = this.lastName.value;
      const birthday = new Date(this.birthdayDate.value);
      birthday.setMinutes(birthday.getMinutes() - birthday.getTimezoneOffset());
      this.user.birthday = {
        date: birthday,
        place: this.birthdayPlace.value,
      };
      this.user.nationality = this.nationality.value;
      this.user.profession = this.profession.value;
      this.user.maritalStatus = this.maritalStatus.value;
      this.user.skype = this.skype.value;
      this.user.intro = this.intro.value;
      this.user.address = this.address.value;
      this.user.email = this.email.value;
      this.user.phone = this.phone.value;
      this.user.website = this.website.value;
      this.userUpdated.emit(this.user);
    }
  }
}
