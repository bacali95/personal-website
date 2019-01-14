import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import $ from "jquery";
import {Certificate} from "../models/certificate";

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  categories: String[] = [];
  certificates: Certificate[] = [];

  constructor(private service: DataService) {
  }

  ngOnInit() {
    this.service.getCertificateCategories().subscribe(categories => {
      categories.forEach(category => {
        $("#category").append(
          `<li><a href="#" data-filter="${category}">${category}</a></li>`
        );
      });
    });

    this.service.getCertificates().subscribe(certificates=>{
      this.certificates = certificates;
    });
  }

}
