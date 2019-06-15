import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user';
import {HttpEventType} from '@angular/common/http';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  imageEvent: Event;
  showCropper: boolean = false;

  private editMode: boolean = false;
  user: User = new User();
  private croppedImage: any = '';
  imageUploading: boolean = false;

  constructor(private userService: UserService,
              private uploadService: UploadService) {
    userService.getCurrent()
      .then(user => {
        this.user = user;
      });
  }

  ngOnInit() {
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
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

}
