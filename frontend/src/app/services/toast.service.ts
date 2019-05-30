import {Injectable} from '@angular/core';
import {NbGlobalLogicalPosition, NbToastrService} from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  config = {
    duration: 2000,
    position: NbGlobalLogicalPosition.BOTTOM_END,
  };

  constructor(private toastrService: NbToastrService) {
  }

  info(message: string) {
    this.toastrService.info(message, 'Info', this.config);
  }

  success(message: string) {
    this.toastrService.success(message, 'Success', this.config);
  }

  warning(message: string) {
    this.toastrService.warning(message, 'Warning', this.config);
  }

  error(message: string) {
    this.toastrService.danger(message, 'Error', this.config);
  }
}
