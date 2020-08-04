import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../model/profile';
import { ToastService } from '../../services/toast.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  imageEvent: Event;
  showCropper: boolean = false;
  baseHref = '';

  profile: Profile = new Profile();
  private croppedImage: any = '';
  imageUploading: boolean = false;

  constructor(private profileService: ProfileService, private toastService: ToastService) {
    if (environment.production) {
      this.baseHref = '/admin';
    }
  }

  async ngOnInit() {
    await this.refresh();
    this.profile.birthdayDate = new Date(this.profile.birthdayDate);
  }

  async refresh() {
    this.profile = await this.profileService.getCurrent();
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
    const firebaseStorage = firebase.storage().ref();
    firebaseStorage
      .child('profile.png')
      .putString(this.croppedImage, firebase.storage.StringFormat.DATA_URL)
      .then(
        async (snapshot) => {
          this.profile.imageURL = await snapshot.ref.getDownloadURL();
          await this.profileService.update(this.profile);
          this.imageEvent = null;
          this.showCropper = false;
          this.imageUploading = false;
        },
        () => {
          this.imageEvent = null;
          this.showCropper = false;
          this.imageUploading = false;
        },
      );
  }

  imageCropped(image: ImageCroppedEvent) {
    this.croppedImage = image.base64;
  }

  submit() {
    this.profileService.update(this.profile).then(() => {
      this.toastService.success();
      return this.refresh();
    });
  }
}
