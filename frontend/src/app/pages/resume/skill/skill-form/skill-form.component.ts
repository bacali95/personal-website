import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ToastService } from '../../../../services/toast.service';
import { Skill } from '../../../../model/skill';
import { SkillService } from '../../../../services/skill.service';

@Component({
  selector: 'skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss'],
})
export class SkillFormComponent implements OnInit {
  @Input() skill: Skill;
  @Input() rank: number;

  model: FormGroup;
  name: FormControl = new FormControl(null, [Validators.required]);
  value: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private skillService: SkillService,
    private dialogRef: NbDialogRef<SkillFormComponent>,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.model = new FormGroup({
      name: this.name,
      value: this.value,
    });
    if (this.skill) {
      this.name.setValue(this.skill.name);
      this.value.setValue(this.skill.value);
    }
  }

  submit() {
    if (this.model.valid) {
      if (this.skill && this.skill._id) {
        this.skill.name = this.name.value;
        this.skill.value = this.value.value;
        this.skillService
          .update(this.skill)
          .then(() => {
            this.toastService.success();
            this.dialogRef.close('success');
          })
          .catch((data) => {
            this.toastService.error(data.error.message);
          });
      } else {
        const skill: Skill = {
          name: this.name.value,
          value: this.value.value,
          rank: this.rank,
        };
        this.skillService
          .create(skill)
          .then(() => {
            this.toastService.success();
            this.dialogRef.close('success');
          })
          .catch((data) => {
            this.toastService.error(data.error.message);
          });
      }
    }
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
