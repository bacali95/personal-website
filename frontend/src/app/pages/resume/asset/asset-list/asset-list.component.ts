import {Component, OnInit} from '@angular/core';
import {NbDialogService} from '@nebular/theme';
import {AssetFormComponent} from '../asset-form/asset-form.component';
import {AssetService} from '../../../../services/asset.service';
import {Asset} from '../../../../model/asset';

@Component({
  selector: 'asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss'],
})
export class AssetListComponent implements OnInit {

  assets: Asset[] = [];

  constructor(private assetService: AssetService,
              private dialogService: NbDialogService) {
    this.refresh();
  }

  ngOnInit() {
  }

  refresh() {
    this.assetService.getAll()
      .then((Assets) => {
        this.assets = [...Assets];
      });
  }

  openAddForm() {
    this.dialogService.open(AssetFormComponent, {
      context: {
        rank: this.assets.length + 1,
      },
    }).onClose
      .subscribe(() => {
        this.refresh();
      });
  }

  openEditForm(asset: Asset) {
    this.dialogService.open(AssetFormComponent, {
      context: {
        asset: asset,
      },
    }).onClose.subscribe(() => {
      this.refresh();
    });
  }
}
