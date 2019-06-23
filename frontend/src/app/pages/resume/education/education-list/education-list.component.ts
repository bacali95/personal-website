import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from '@bacali/ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {EducationFormComponent} from '../education-form/education-form.component';
import {ToastService} from '../../../../services/toast.service';
import {ConfirmDialogComponent, CustomActionItemComponent} from '../../../../@theme/components';
import {EducationService} from '../../../../services/education.service';
import {Education} from '../../../../model/education';

@Component({
  selector: 'education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.scss'],
})
export class EducationListComponent implements OnInit {

  educations: Education[] = [];

  settings = {
    actions: {
      edit: false,
      delete: false,
      custom: [
        {name: 'up', icon: 'arrow-ios-upward-outline', renderComponent: CustomActionItemComponent},
        {name: 'down', icon: 'arrow-ios-downward-outline', renderComponent: CustomActionItemComponent},
        {name: 'edit', icon: 'edit-2-outline', renderComponent: CustomActionItemComponent},
        {name: 'delete', icon: 'trash-2-outline', renderComponent: CustomActionItemComponent},
      ],
      position: 'right',
    },
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"/>',
    },
    columns: {
      rank: {
        title: '#',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      period: {
        title: 'Period',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private educationService: EducationService,
              private dialogService: NbDialogService,
              private toastService: ToastService) {
    this.refresh();
  }

  ngOnInit() {
  }

  refresh() {
    this.educationService.getAll()
      .then((educations) => {
        this.educations = [...educations];
        this.source.load(educations);
      });
  }

  openAddForm() {
    this.dialogService.open(EducationFormComponent, {
      context: {
        rank: this.educations.length + 1,
      },
    }).onClose
      .subscribe(() => {
        this.refresh();
      });
  }

  onCustomActions(event: any) {
    const education: Education = event.data;
    switch (event.action) {
      case 'up':
        if (education.rank > 1) {
          education.rank--;
          this.educations[education.rank - 1].rank++;
          this.educationService.update(this.educations[education.rank - 1])
            .then(() => this.educationService.update(education))
            .then(() => this.refresh());
        }
        break;
      case 'down':
        if (education.rank < this.educations.length + 1) {
          education.rank++;
          this.educations[education.rank - 1].rank--;
          this.educationService.update(this.educations[education.rank - 1])
            .then(() => this.educationService.update(education))
            .then(() => this.refresh());
        }
        break;
      case 'edit':
        this.dialogService.open(EducationFormComponent, {
          context: {
            value: education,
          },
        }).onClose.subscribe(() => {
          this.refresh();
        });
        break;
      case 'delete':
        this.dialogService.open(ConfirmDialogComponent, {
          context: {
            title: 'Delete education',
            message: 'Are you sure you want to delete?',
          },
        }).onClose
          .subscribe(async (result) => {
            if (result) {
              for (let i = education.rank; i < this.educations.length; i++) {
                this.educations[i].rank--;
                await this.educationService.update(this.educations[i]);
              }
              this.educationService.delete(education._id)
                .then((data: { message: string }) => {
                  this.toastService.success(data.message);
                  this.refresh();
                });
            }
          });
    }
  }
}
