import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../model/user';

@Component({
  selector: 'education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.scss'],
})
export class EducationDetailsComponent implements OnInit {

  @Input() user: User;
  @Output() userUpdated: EventEmitter<User> = new EventEmitter();  constructor() { }

  ngOnInit() {
  }

}
