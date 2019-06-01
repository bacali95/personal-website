import { Component } from '@angular/core';

@Component({
  selector: 'footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://akveo.com" target="_blank">Akveo</a></b> 2019</span>
  `,
})
export class FooterComponent {
}
