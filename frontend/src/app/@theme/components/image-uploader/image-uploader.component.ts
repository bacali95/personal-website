import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const firebaseStorage = firebase.storage().ref();

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  @Output() imagesChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Input() images: string[];
  @Input() uploading: boolean;

  uploadingFiles: {
    [key: string]: {
      local: string;
      progress: number;
    };
  } = {};

  constructor() {}

  ngOnInit() {}

  addImages(files) {
    for (const file of files) {
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        continue;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        const uploadTask = firebaseStorage
          .child(`projects/${Date.now()}-${file.name}`)
          .putString(reader.result as string, firebase.storage.StringFormat.DATA_URL);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            if (!this.uploadingFiles[snapshot.ref.fullPath]) {
              this.uploadingFiles[snapshot.ref.fullPath] = {
                local: reader.result as string,
                progress: 0,
              };
            }
            this.uploadingFiles[snapshot.ref.fullPath].progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            console.log(this.uploadingFiles[snapshot.ref.fullPath].progress, '%');
          },
          (error) => {
            console.log(error);
            delete this.uploadingFiles[uploadTask.snapshot.ref.fullPath];
          },
          async () => {
            console.log('done', uploadTask.snapshot.ref.fullPath);
            delete this.uploadingFiles[uploadTask.snapshot.ref.fullPath];
            this.images.push(await uploadTask.snapshot.ref.getDownloadURL());
            this.imagesChange.emit(this.images);
          },
        );
      };
    }
  }

  async delete(image: string) {
    console.log(image);
    await firebaseStorage
      .child('projects')
      .child(decodeURIComponent(image.replace(/.*\/o\//g, '').replace(/\?.*/g, '')).replace('projects/', ''))
      .delete();
    const index = this.images.indexOf(image);
    if (index >= 0) {
      this.images.splice(index, 1);
      this.imagesChange.emit(this.images);
    }
  }
}
