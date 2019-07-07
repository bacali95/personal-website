import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user';
import {HttpEventType} from '@angular/common/http';
import {UploadService} from '../../services/upload.service';
import {ToastService} from '../../services/toast.service';
import {APP_BASE_HREF} from '@angular/common';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  imageEvent: Event;
  showCropper: boolean = false;

  user: User = new User();
  private croppedImage: any = '';
  imageUploading: boolean = false;

  constructor(private userService: UserService,
              private uploadService: UploadService,
              private toastService: ToastService,
              @Inject(APP_BASE_HREF) private baseHref) {
    this.refresh();
  }

  ngOnInit() {
  }

  private refresh() {
    this.userService.getCurrent()
      .then(user => {
        this.user = user;
      });
  }

  fileChangeEvent(event) {
    this.imageEvent = event;
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cancelCropping() {
    this.imageEvent = null;
    this.showCropper = false;
  }

  validCropping() {
    this.imageUploading = true;
    const formData = new FormData();
    formData.append('uploads[]', this.croppedImage, this.croppedImage.name);
    this.uploadService.uploadFile(formData)
      .subscribe(response => {
        if (response.status === HttpEventType.Response) {
          this.user.image = response.body;
          this.userService.update(this.user);
          this.imageEvent = null;
          this.showCropper = false;
          this.imageUploading = false;
        }
      });
  }

  imageCropped(image: Blob) {
    this.croppedImage = image;
  }

  updateUser(user: User) {
    this.userService.update(user)
      .then((data: { message: string }) => {
        this.refresh();
        this.toastService.success(data.message);
      });
  }
}
