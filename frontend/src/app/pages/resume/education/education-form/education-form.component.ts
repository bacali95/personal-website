import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ToastService } from '../../../../services/toast.service';
import { Education } from '../../../../model/education';
import { EducationService } from '../../../../services/education.service';

@Component({
  selector: 'education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss'],
})
export class EducationFormComponent implements OnInit {
  @Input() value: Education;
  @Input() rank: number;

  model: FormGroup;
  name: FormControl = new FormControl(null, [Validators.required]);
  detail: FormControl = new FormControl(null, [Validators.required]);
  period: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private educationService: EducationService,
    private dialogRef: NbDialogRef<EducationFormComponent>,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.model = new FormGroup({
      name: this.name,
      detail: this.detail,
      period: this.period,
    });
    if (this.value) {
      this.name.setValue(this.value.name);
      this.detail.setValue(this.value.detail);
      this.period.setValue(this.value.period);
    }
  }

  submit() {
    if (this.model.valid) {
      if (this.value && this.value.id) {
        this.value.name = this.name.value;
        this.value.detail = this.detail.value;
        this.value.period = this.period.value;
        this.educationService
          .update(this.value)
          .then(() => {
            this.toastService.success();
            this.dialogRef.close('success');
          })
          .catch((data) => {
            this.toastService.error(data.error.message);
          });
      } else {
        const education: Education = {
          name: this.name.value,
          detail: this.detail.value,
          period: this.period.value,
          rank: this.rank,
        };
        this.educationService
          .create(education)
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
