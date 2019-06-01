import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {ProjectFormComponent} from '../project-form/project-form.component';
import {ToastService} from '../../../services/toast.service';
import {ConfirmDialogComponent} from '../../../@theme/components';
import {ProjectService} from '../../../services/project.service';
import {Router} from '@angular/router';

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
        valuePrepareFunction: (cell, row) => {
          return cell.map(item => item.name).join(', ');
        },
      },
      startDate: {
        title: 'Type',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          const date = new Date(cell);
          return `${date.getMonth() + 1} - ${date.getFullYear()}`;
        },
      },
      endDate: {
        title: 'Type',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          const date = new Date(cell);
          return `${date.getMonth() + 1} - ${date.getFullYear()}`;
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private projectService: ProjectService,
              private router: Router,
              private dialogService: NbDialogService,
              private toastService: ToastService) {
    this.refresh();
  }

  ngOnInit() {
  }

  refresh() {
    this.projectService.getAll().subscribe((projects) => {
      this.source.load(projects);
    });
  }

  openAddForm() {
    this.router.navigate(['pages/project/add']);
  }

  onCustomActions(event: any) {
    if (event.action === 'edit') {
      this.router.navigate([`pages/project/edit/${event.data._id}`]);
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
              .subscribe((data: { message: string }) => {
                this.toastService.success(data.message);
                this.refresh();
              });
          }
        });
    }
  }
}
