import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '../../../../services/toast.service';
import { Project } from '../../../../model/project';
import { ProjectService } from '../../../../services/project.service';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../model/category';
import { Subject } from 'rxjs';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit, AfterViewInit {
  @Input() project: Project = new Project();

  categoriesList: Category[] = [];

  id: string;
  submitting: boolean = false;
  submittedImagesNumber: Subject<number> = new Subject<number>();
  selectedCategories: string[] = [];

  constructor(
    private projectService: ProjectService,
    private categoryService: CategoryService,
    private dialogRef: NbDialogRef<ProjectFormComponent>,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.categoryService.getAll().then((categories) => {
      this.categoriesList = [...categories];
      this.selectedCategories = [...this.project.categories.map((value) => value.id)];
    });
  }

  ngAfterViewInit(): void {}

  async submit() {
    if (this.project.images && this.project.images.length > 0) {
      this.submitting = true;
      this.project.categories = [...this.categoriesList.filter((value) => this.selectedCategories.includes(value.id))];
      if (this.project.id) {
        this.projectService
          .update(this.project)
          .then(() => {
            this.toastService.success();
            this.dialogRef.close('success');
          })
          .catch((data) => {
            this.submitting = false;
            this.toastService.error(data.error.message);
          });
      } else {
        this.projectService
          .create(this.project)
          .then(() => {
            this.toastService.success();
            this.dialogRef.close('success');
          })
          .catch((data) => {
            this.submitting = false;
            this.toastService.error(data.error.message);
          });
      }
    } else {
      this.toastService.info('Select images for the project!');
    }
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
