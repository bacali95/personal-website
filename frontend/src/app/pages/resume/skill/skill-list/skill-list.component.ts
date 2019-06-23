import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from '@bacali/ng2-smart-table';
import {NbDialogService} from '@nebular/theme';
import {SkillFormComponent} from '../skill-form/skill-form.component';
import {ToastService} from '../../../../services/toast.service';
import {ConfirmDialogComponent, CustomActionItemComponent} from '../../../../@theme/components';
import {SkillService} from '../../../../services/skill.service';
import {Skill} from '../../../../model/skill';
import {SkillValueComponent} from './skill-value/skill-value.component';

@Component({
  selector: 'skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss'],
})
export class SkillListComponent implements OnInit {

  skills: Skill[] = [];

  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
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
      value: {
        title: 'Value',
        type: 'custom',
        valuePrepareFunction: (cell) => {
          return {
            parent: this,
            value: cell,
          };
        },
        renderComponent: SkillValueComponent,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private skillService: SkillService,
              private dialogService: NbDialogService,
              private toastService: ToastService) {
    this.refresh();
  }

  ngOnInit() {
  }

  refresh() {
    this.skillService.getAll()
      .then((skills) => {
        this.skills = [...skills];
        this.source.load(skills);
      });
  }

  openAddForm() {
    this.dialogService.open(SkillFormComponent, {
      context: {
        rank: this.skills.length + 1,
      },
    }).onClose
      .subscribe(() => {
        this.refresh();
      });
  }

  onCustomActions(event: any) {
    const skill: Skill = event.data;
    switch (event.action) {
      case 'up':
        if (skill.rank > 1) {
          skill.rank--;
          this.skills[skill.rank - 1].rank++;
          this.skillService.update(this.skills[skill.rank - 1])
            .then(() => this.skillService.update(skill))
            .then(() => this.refresh());
        }
        break;
      case 'down':
        if (skill.rank < this.skills.length + 1) {
          skill.rank++;
          this.skills[skill.rank - 1].rank--;
          this.skillService.update(this.skills[skill.rank - 1])
            .then(() => this.skillService.update(skill))
            .then(() => this.refresh());
        }
        break;
      case 'edit':
        this.dialogService.open(SkillFormComponent, {
          context: {
            skill: skill,
          },
        }).onClose.subscribe(() => {
          this.refresh();
        });
        break;
      case 'delete':
        this.dialogService.open(ConfirmDialogComponent, {
          context: {
            title: 'Delete skill',
            message: 'Are you sure you want to delete?',
          },
        }).onClose
          .subscribe(async (result) => {
            if (result) {
              for (let i = skill.rank; i < this.skills.length; i++) {
                this.skills[i].rank--;
                await this.skillService.update(this.skills[i]);
              }
              this.skillService.delete(skill._id)
                .then((data: { message: string }) => {
                  this.toastService.success(data.message);
                  this.refresh();
                });
            }
          });
    }
  }
}
