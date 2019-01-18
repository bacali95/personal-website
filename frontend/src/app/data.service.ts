import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Project} from "./models/project";
import {Category} from "./models/category";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: String = '/ws';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*'
  });

  constructor(private http: HttpClient) {
  }

  getProjects() {
    return this.http.get<Project[]>(`${this.url}/projects`, {headers: this.headers});
  }

  getProjectById(id) {
    return this.http.get<Project>(`${this.url}/project/${id}`, {headers: this.headers});
  }


  getCategories() {
    return this.http.get<Category[]>(`${this.url}/categories`, {headers: this.headers});
  }

}
