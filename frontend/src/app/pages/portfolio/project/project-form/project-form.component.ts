import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../../../services/toast.service';
import {Project} from '../../../../model/project';
import {ProjectService} from '../../../../services/project.service';
import {CategoryService} from '../../../../services/category.service';
import {Category} from '../../../../model/category';
import {UploadService} from '../../../../services/upload.service';
import {HttpEventType} from '@angular/common/http';
import {Subject} from 'rxjs';
import {LocalImage} from '../../../../model/image';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit, AfterViewInit {

  @Input() value: Project;
  @ViewChild('categoriesSelect', {static: false}) categoriesSelect;

  categoriesList: Category[] = [];

  model: FormGroup;
  _id: string;
  title: FormControl = new FormControl('', [Validators.required]);
  description: FormControl = new FormControl('', [Validators.required]);
  type: FormControl = new FormControl('', [Validators.required]);
  categories: FormControl = new FormControl([], [Validators.required]);
  startDate: FormControl = new FormControl(new Date(), [Validators.required]);
  endDate: FormControl = new FormControl(new Date(), [Validators.required]);
  githubLink: FormControl = new FormControl('#');
  images: any[] = [];
  submitting: boolean = false;
  submittedImagesNumber: Subject<number> = new Subject<number>();

  constructor(private projectService: ProjectService,
              private categoryService: CategoryService,
              private uploadService: UploadService,
              private dialogRef: NbDialogRef<ProjectFormComponent>,
              private toastService: ToastService) {
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
      this._id = this.value._id;
      this.title.setValue(this.value.title);
      this.description.setValue(this.value.description);
      this.type.setValue(this.value.type);
      this.categories.setValue([...this.value.categories]);
      this.startDate.setValue(new Date(this.value.startDate));
      this.endDate.setValue(new Date(this.value.endDate));
      this.githubLink.setValue(this.value.githubLink);
      this.images = [...this.value.images];
    }
    this.categoryService.getAll()
      .then((categories) => {
        this.categoriesList = [...categories];
        setTimeout(() => {
          const options = this.categoriesSelect.nativeElement.options;
          for (let i = 0; i < options.length; i++) {
            const value = options[i].skill.replace(`${i}: `, '').replace(new RegExp('\'', 'g'), '');
            options[i].selected = this.categories.value.map(c => c._id).indexOf(value) > -1;
          }
        }, 100);
      });
  }

  ngAfterViewInit(): void {
  }

  uploadImages() {
    let finished = 0;
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i] instanceof LocalImage) {
        const formData = new FormData();
        formData.append('uploads[]', this.images[i].payload, this.images[i].payload.name);
        this.uploadService.uploadFile(formData)
          .subscribe(response => {
            if (response.status === HttpEventType.UploadProgress) {
              this.images[i].progress = response.body;
            } else if (response.status === HttpEventType.Sent) {
              this.images[i].progress = 100;
            } else if (response.status === HttpEventType.Response) {
              this.images[i] = response.body;
              finished++;
              this.submittedImagesNumber.next(finished);
            }
          });
      } else {
        finished++;
        this.submittedImagesNumber.next(finished);
      }
    }
  }

  submit() {
    if (this.model.valid && this.images.length > 0) {
      this.categories
        .setValue(this.categoriesList
          .filter(value => this.model.value.categories.indexOf(value._id) > -1));
      this.submittedImagesNumber.asObservable()
        .subscribe(value => {
          if (value === this.images.length) {
            this.model.value.images = this.images;
            if (this._id) {
              this.model.value._id = this._id;
              this.projectService.update(this.model.value)
                .then((data: { message: string }) => {
                  this.toastService.success(data.message);
                  this.dialogRef.close('success');
                })
                .catch((data) => {
                  this.submitting = false;
                  this.toastService.error(data.error.message);
                });
            } else {
              const project: Project = this.model.value;
              this.projectService.create(project)
                .then((data: { message: string }) => {
                  this.toastService.success(data.message);
                  this.dialogRef.close('success');
                })
                .catch((data) => {
                  this.submitting = false;
                  this.toastService.error(data.error.message);
                });
            }
          }
        });
      this.submitting = true;
      this.uploadImages();
    } else if (this.images.length === 0) {
      this.toastService.info('Select images for the project!');
    }
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
