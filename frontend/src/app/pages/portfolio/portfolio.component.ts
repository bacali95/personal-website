import {Component} from '@angular/core';

@Component({
  selector: 'portfolio',
  template: `
    <category-list></category-list>
    <project-list></project-list>
  `,
})
export class PortfolioComponent {

  constructor() {
  }

}
