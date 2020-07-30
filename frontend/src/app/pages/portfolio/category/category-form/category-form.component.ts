import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ToastService } from '../../../../services/toast.service';
import { Category } from '../../../../model/category';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  @Input() value: Category;

  model: FormGroup;
  name: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private categoryService: CategoryService,
    private dialogRef: NbDialogRef<CategoryFormComponent>,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.model = new FormGroup({
      name: this.name,
    });
    if (this.value) {
      this.name.setValue(this.value.name);
    }
  }

  submit() {
    if (this.model.valid) {
      if (this.value && this.value.id) {
        this.value.name = this.name.value;
        this.categoryService
          .update(this.value)
          .then(() => {
            this.toastService.success();
            this.dialogRef.close('success');
          })
          .catch((data) => {
            this.toastService.error(data.error.message);
          });
      } else {
        const category: Category = {
          name: this.name.value,
        };
        this.categoryService
          .create(category)
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
