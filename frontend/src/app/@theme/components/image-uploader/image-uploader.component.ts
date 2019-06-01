import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Image, LocalImage} from '../../../model/image';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {

  @Output() imagesChange: EventEmitter<(Image | LocalImage)[]> = new EventEmitter<(Image | LocalImage)[]>();
  @Input() images: (Image | LocalImage)[];
  @Input() uploading: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  addImages(files) {
    for (const file of files) {
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        continue;
      }

      const image = new LocalImage();
      image.public_id = file.name;
      image.format = mimeType.replace(/image\//, '');

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        if (!this.images.find((value => (value instanceof LocalImage) ? value.secure_url === reader.result : value.bytes === file.size))) {
          image.secure_url = reader.result;
          image.payload = file;
          this.images.push(image);
          this.imagesChange.emit(this.images);
        }
      };
    }
  }

  delete(image: Image | LocalImage) {
    const index = this.images.indexOf(image);
    if (index >= 0) {
      this.images.splice(index, 1);
      this.imagesChange.emit(this.images);
    }
  }

  isFromServer(image) {
    return !isNullOrUndefined(image.signature);
  }
}
