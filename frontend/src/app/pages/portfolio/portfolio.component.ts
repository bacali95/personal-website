import {Component} from '@angular/core';

@Component({
  selector: 'portfolio',
  template: `
    <nb-accordion>
      <nb-accordion-item>
        <nb-accordion-item-header>
          Categories
        </nb-accordion-item-header>
        <nb-accordion-item-body>
          <category-list></category-list>
        </nb-accordion-item-body>
      </nb-accordion-item>
      <nb-accordion-item>
        <nb-accordion-item-header>
          Projects
        </nb-accordion-item-header>
        <nb-accordion-item-body>
          <project-list></project-list>
        </nb-accordion-item-body>
      </nb-accordion-item>
    </nb-accordion>
  `,
})
export class PortfolioComponent {

  constructor() {
  }

}
