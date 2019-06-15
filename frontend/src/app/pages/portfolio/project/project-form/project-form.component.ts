import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '../../../../services/toast.service';
import {Project} from '../../../../model/project';
import {ProjectService} from '../../../../services/project.service';
import {CategoryService} from '../../../../services/category.service';
import {Category} from '../../../../model/category';
import {ActivatedRoute, Router} from '@angular/router';
import {UploadService} from '../../../../services/upload.service';
import {HttpEventType} from '@angular/common/http';
import {Subject} from 'rxjs';
import {LocalImage} from '../../../../model/image';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit, AfterViewInit {

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
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastService: ToastService) {
    this._id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this._id) {
      this.projectService.get(this._id)
        .then(project => {
          this.title.setValue(project.title);
          this.description.setValue(project.description);
          this.type.setValue(project.type);
          this.categories.setValue([...project.categories]);
          this.startDate.setValue(new Date(project.startDate));
          this.endDate.setValue(new Date(project.endDate));
          this.githubLink.setValue(project.githubLink);
          this.images = [...project.images];
        });
    }
    this.categoryService.getAll()
      .then((categories) => {
        this.categoriesList = [...categories];
        setTimeout(() => {
          const options = this.categoriesSelect.nativeElement.options;
          for (let i = 0; i < options.length; i++) {
            const value = options[i].value.replace(`${i}: `, '').replace(new RegExp('\'', 'g'), '');
            options[i].selected = this.categories.value.map(c => c._id).indexOf(value) > -1;
          }
        }, 100);
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
      this.submittedImagesNumber.asObservable()
        .subscribe(value => {
          if (value === this.images.length) {
            this.model.value.images = this.images;
            if (this._id) {
              this.model.value._id = this._id;
              this.projectService.update(this.model.value)
                .then((data: { message: string }) => {
                  this.toastService.success(data.message);
                  this.router.navigate(['pages/portfolio/project']);
                }).catch((data) => {
                this.submitting = false;
                this.toastService.error(data.error.message);
              });
            } else {
              const project: Project = this.model.value;
              this.projectService.create(project)
                .then((data: { message: string }) => {
                  this.toastService.success(data.message);
                  this.router.navigate(['pages/portfolio/project']);
                }).catch((data) => {
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
    this.router.navigate(['pages/portfolio/project']);
  }
}
