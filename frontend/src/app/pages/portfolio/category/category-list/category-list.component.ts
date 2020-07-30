import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from '@bacali/ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { ToastService } from '../../../../services/toast.service';
import { ConfirmDialogComponent, CustomActionItemComponent } from '../../../../@theme/components';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  settings = {
    actions: {
      edit: false,
      delete: false,
      custom: [
        { name: 'edit', icon: 'edit-2-outline', renderComponent: CustomActionItemComponent },
        { name: 'delete', icon: 'trash-2-outline', renderComponent: CustomActionItemComponent },
      ],
      position: 'right',
    },
    mode: 'external',
    add: {
      addButtonContent: '+',
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private categoryService: CategoryService,
    private dialogService: NbDialogService,
    private toastService: ToastService,
  ) {
    this.refresh();
  }

  ngOnInit() {}

  refresh() {
    this.categoryService.getAll().then((categories) => {
      this.source.load(categories);
    });
  }

  openAddForm() {
    this.dialogService.open(CategoryFormComponent).onClose.subscribe((res) => {
      this.refresh();
    });
  }

  onCustomActions(event: any) {
    if (event.action === 'edit') {
      this.dialogService
        .open(CategoryFormComponent, {
          context: {
            value: event.data,
          },
        })
        .onClose.subscribe(() => {
          this.refresh();
        });
    } else {
      this.dialogService
        .open(ConfirmDialogComponent, {
          context: {
            title: 'Delete category',
            message: 'Are you sure you want to delete?',
          },
        })
        .onClose.subscribe((result) => {
          if (result) {
            this.categoryService.delete(event.data.id).then(() => {
              this.toastService.success();
              this.refresh();
            });
          }
        });
    }
  }
}
