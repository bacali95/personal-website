import {Component, OnInit} from '@angular/core';
import {Project} from "../models/project";
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent implements OnInit {

  private id;
  project: Project = new Project();
  images: String[];
  options = {
    navigation: true,
    slideSpeed: 300,
    paginationSpeed: 400,
    responsiveRefreshRate: 200,
    responsiveBaseWidth: window,
    pagination: false,
    autoPlay: true,
    singleItem: true,
    navigationText: ["<span class='icon-left-open-big'></span>", "<span class='icon-right-open-big'></span>"]
  };

  constructor(private service: DataService,
              private activatedRoute: ActivatedRoute) {
    this.id = activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.service.getProjectById(this.id).subscribe(project => {
      this.project = project;
      this.images = this.project.images.map(image => {
        return image.secure_url;
      })
    });
  }

}
