import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import {ToastService} from '../../../services/toast.service';
import {Project} from '../../../model/project';
import {ProjectService} from '../../../services/project.service';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../model/category';
import {NbSelectComponent} from '@nebular/theme/components/select/select.component';

@Component({
  selector: 'nba-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit, AfterViewInit {

  @Input() value: Project;

  @ViewChild('categoriesSelect') categoriesSelect: NbSelectComponent<Category>;

  categoriesList: Category[] = [];

  model: FormGroup;
  title: FormControl = new FormControl('', [Validators.required]);
  description: FormControl = new FormControl('', [Validators.required]);
  type: FormControl = new FormControl('', [Validators.required]);
  categories: FormControl = new FormControl([], [Validators.required]);
  startDate: FormControl = new FormControl(new Date(), [Validators.required]);
  endDate: FormControl = new FormControl(new Date(), [Validators.required]);
  githubLink: FormControl = new FormControl('#');

  constructor(private projectService: ProjectService,
              private categoryService: CategoryService,
              private dialogRef: NbDialogRef<ProjectFormComponent>,
              private toastService: ToastService) {
    this.categoryService.getAll()
      .subscribe((categories) => {
        this.categoriesList = [...categories];
      });
  }

  ngOnInit() {
    this.model = new FormGroup({
      title: this.title,
      description: this.description,
      type: this.type,
      categories: this.categories,
      startDate: this.startDate,
      endDate: this.endDate,
      githubLink: this.githubLink,
    });
    if (this.value) {
      this.title.setValue(this.value.title);
      this.description.setValue(this.value.description);
      this.type.setValue(this.value.type);
      this.categories.setValue([...this.value.categories]);
      this.startDate.setValue(new Date(this.value.startDate));
      this.endDate.setValue(new Date(this.value.endDate));
      this.githubLink.setValue(this.value.githubLink);
    }
  }

  ngAfterViewInit(): void {
    this.categoriesSelect.setSelected = this.categories.value;
  }

  submit() {
    if (this.model.valid) {
      if (this.value && this.value._id) {
        this.model.value._id = this.value._id;
        this.projectService.update(this.model.value)
          .subscribe((data: { message: string }) => {
            this.toastService.success(data.message);
            // this.dialogRef.close('success');
          }, (data) => {
            this.toastService.error(data.error.message);
          });
      } else {
        const project: Project = this.model.value;
        this.projectService.create(project)
          .subscribe((data: { message: string }) => {
            this.toastService.success(data.message);
            // this.dialogRef.close('success');
          }, (data) => {
            this.toastService.error(data.error.message);
          });
      }
    }
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
