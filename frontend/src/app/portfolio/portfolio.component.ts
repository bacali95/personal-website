import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Category} from "../models/category";
import {Project} from "../models/project";
import $ from "jquery";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  projects: Project[] = [];

  constructor(private service: DataService) {
  }

  ngOnInit() {
    this.service.getCategories().subscribe(categories => {
      categories.forEach(category => {
        $("#category").append(
          `<li><a data-filter="${category.name}">${category.name}</a></li>`
        );
      });
    });
    this.service.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

}
