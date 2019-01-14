import { Component, OnInit } from '@angular/core';
import {Certificate} from "../models/certificate";
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-show-certificate',
  templateUrl: './show-certificate.component.html',
  styleUrls: ['./show-certificate.component.css']
})
export class ShowCertificateComponent implements OnInit {

  private id;
  certificate:Certificate = new Certificate();
  images: String[] = [];
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
    this.service.getCertificateById(this.id).subscribe(certificate => {
      this.certificate = certificate;
      this.images = this.certificate.images.map(image => {
        return image.secure_url;
      })
    });
  }
}
