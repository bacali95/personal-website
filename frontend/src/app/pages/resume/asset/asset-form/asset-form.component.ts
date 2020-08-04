import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { ToastService } from '../../../../services/toast.service';
import { Asset } from '../../../../model/asset';
import { AssetService } from '../../../../services/asset.service';

@Component({
  selector: 'asset-form',
  templateUrl: './asset-form.component.html',
  styleUrls: ['./asset-form.component.scss'],
})
export class AssetFormComponent implements OnInit {
  @Input() asset: Asset;
  @Input() rank: number;

  model: FormGroup;
  name: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private assetService: AssetService,
    private dialogRef: NbDialogRef<AssetFormComponent>,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.model = new FormGroup({
      name: this.name,
    });
    if (this.asset) {
      this.name.setValue(this.asset.name);
    }
  }

  submit() {
    if (this.model.valid) {
      if (this.asset && this.asset._id) {
        this.asset.name = this.name.value;
        this.assetService
          .update(this.asset)
          .then(() => {
            this.toastService.success();
            this.dialogRef.close('success');
          })
          .catch((data) => {
            this.toastService.error(data.error.message);
          });
      } else {
        const asset: Asset = {
          name: this.name.value,
        };
        this.assetService
          .create(asset)
          .then(() => {
            this.toastService.success();
            this.dialogRef.close('success');
          })
          .catch((data) => {
            this.toastService.error(data.error.message);
          });
      }
    }
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

  delete(id: string) {
    this.assetService
      .delete(id)
      .then(() => {
        this.toastService.success();
        this.dialogRef.close('success');
      })
      .catch((data) => {
        this.toastService.error(data.error.message);
      });
  }
}
