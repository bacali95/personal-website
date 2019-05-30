import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '../model/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl: string = '/api/project';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Project[]>(this.baseUrl);
  }

  create(project: Project) {
    return this.http.post(this.baseUrl, project);
  }

  get(id: string) {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  update(project: Project) {
    return this.http.put(`${this.baseUrl}/${project._id}`, project);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
