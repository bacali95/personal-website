import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SkillService} from '../../../../../services/skill.service';
import {Skill} from '../../../../../model/skill';
import {SkillListComponent} from '../skill-list.component';

@Component({
  selector: 'skill-value',
  templateUrl: './skill-value.component.html',
  styleUrls: ['./skill-value.component.scss'],
})
export class SkillValueComponent implements OnInit {

  renderValue: boolean[] = [];

  @Input() value: {
    value: number,
    parent: SkillListComponent,
  };
  @Input() rowData: Skill;
  @Output() valueUpdated: EventEmitter<any> = new EventEmitter();

  constructor(private skillService: SkillService) {

  }

  ngOnInit() {
    this.renderValue = Array(10).fill(false).map((value, index) => index < this.value.value);
  }

  plus() {
    if (this.rowData.value < 10) {
      this.rowData.value++;
      this.skillService.update(this.rowData)
        .then(() => {
          this.valueUpdated.emit();
          this.value.parent.refresh();
        });
    }
  }

  minus() {
    if (this.rowData.value > 1) {
      this.rowData.value--;
      this.skillService.update(this.rowData)
        .then(() => {
          this.valueUpdated.emit();
          this.value.parent.refresh();
        });
    }
  }

}
