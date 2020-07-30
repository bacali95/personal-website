import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl: string = '/api/projects';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Project[]>(this.baseUrl).toPromise();
  }

  create(project: Project) {
    return this.http.post(this.baseUrl, project).toPromise();
  }

  get(id: string) {
    return this.http.get<Project>(`${this.baseUrl}/${id}`).toPromise();
  }

  update(project: Project) {
    return this.http.put(`${this.baseUrl}/${project.id}`, project).toPromise();
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`).toPromise();
  }
}
