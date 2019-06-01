import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {UserService} from '../../../services/user.service';
import {NbDialogService, NbGlobalLogicalPosition} from '@nebular/theme';
import {UserFormComponent} from '../user-form/user-form.component';
import {ToastService} from '../../../services/toast.service';
import {ConfirmDialogComponent} from '../../../@theme/components';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {name: 'edit', title: `<i class="nb-edit">`},
        {name: 'delete', title: `<i class="nb-trash">`},
      ],
      position: 'right',
    },
    columns: {
      username: {
        title: 'Username',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();


  constructor(private userService: UserService,
              private dialogService: NbDialogService,
              private toastService: ToastService) {
    this.refresh();
  }

  ngOnInit() {
  }

  refresh() {
    this.userService.getAll().subscribe((users) => {
      this.source.load(users);
    });
  }

  openAddForm() {
    this.dialogService.open(UserFormComponent).onClose
      .subscribe((res) => {
        this.refresh();
      });
  }

  onCustomActions(event: any) {
    if (event.action === 'edit') {
      this.dialogService.open(UserFormComponent, {
        context: {
          value: event.data,
        },
      }).onClose.subscribe(() => {
        this.refresh();
      });
    } else {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          title: 'Delete user',
          message: 'Are you sure you want to delete?',
        },
      }).onClose
        .subscribe((result) => {
          if (result) {
            this.userService.delete(event.data._id)
              .subscribe((data: { message: string }) => {
                this.toastService.success(data.message);
                this.refresh();
              });
          }
        });
    }
  }
}
