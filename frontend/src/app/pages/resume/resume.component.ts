import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'resume',
  template: `
    <nb-accordion>
      <nb-accordion-item>
        <nb-accordion-item-header>
          Educations
        </nb-accordion-item-header>
        <nb-accordion-item-body>
          <education-list></education-list>
        </nb-accordion-item-body>
      </nb-accordion-item>
      <nb-accordion-item>
        <nb-accordion-item-header>
          Skills
        </nb-accordion-item-header>
        <nb-accordion-item-body>
          <skill-list></skill-list>
        </nb-accordion-item-body>
      </nb-accordion-item>
      <nb-accordion-item>
        <nb-accordion-item-header>
          Assets
        </nb-accordion-item-header>
        <nb-accordion-item-body>
          <asset-list></asset-list>
        </nb-accordion-item-body>
      </nb-accordion-item>
    </nb-accordion>
  `,
})
export class ResumeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
