import {Component, OnInit} from '@angular/core';
import {DataService} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private service: DataService) {
  }

  ngOnInit() {
    this.service.getProjects().subscribe(projects => {
      console.log(projects);
    })
  }
}
