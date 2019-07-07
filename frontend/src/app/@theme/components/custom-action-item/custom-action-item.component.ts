import {Component, Input} from '@angular/core';

@Component({
  selector: 'ng2-smart-table-custom-action-item-component',
  template: `
    <a href="#">
      <nb-icon [icon]="action.icon"></nb-icon>
    </a>
  `,
})
export class CustomActionItemComponent {

  @Input() action: any;
  @Input() rowData: any;

}
