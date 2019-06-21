import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from '@bacali/ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {ToastService} from '../../../../services/toast.service';
import {ConfirmDialogComponent} from '../../../../@theme/components';
import {ProjectService} from '../../../../services/project.service';
import {ProjectFormComponent} from '../project-form/project-form.component';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {

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
      title: {
        title: 'Name',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'string',
      },
      categories: {
        title: 'Categories',
        type: 'string',
        valuePrepareFunction: (cell) => {
          return cell.map(item => item.name).join(', ');
        },
      },
      startDate: {
        title: 'Type',
        type: 'string',
        valuePrepareFunction: (cell) => {
          const date = new Date(cell);
          return `${date.getMonth() + 1} - ${date.getFullYear()}`;
        },
      },
      endDate: {
        title: 'Type',
        type: 'string',
        valuePrepareFunction: (cell) => {
          const date = new Date(cell);
          return `${date.getMonth() + 1} - ${date.getFullYear()}`;
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private projectService: ProjectService,
              private dialogService: NbDialogService,
              private toastService: ToastService) {
    this.refresh();
  }

  ngOnInit() {
  }

  refresh() {
    this.projectService.getAll()
      .then((projects) => {
        this.source.load(projects);
      });
  }

  openAddForm() {
    this.dialogService.open(ProjectFormComponent).onClose
      .subscribe((res) => {
        this.refresh();
      });
  }

  onCustomActions(event: any) {
    if (event.action === 'edit') {
      this.dialogService.open(ProjectFormComponent, {
        context: {
          value: event.data,
        },
      }).onClose.subscribe(() => {
        this.refresh();
      });
    } else {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          title: 'Delete project',
          message: 'Are you sure you want to delete?',
        },
      }).onClose
        .subscribe((result) => {
          if (result) {
            this.projectService.delete(event.data._id)
              .then((data: { message: string }) => {
                this.toastService.success(data.message);
                this.refresh();
              });
          }
        });
    }
  }
}
