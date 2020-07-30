import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Education } from '../model/education';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private baseUrl: string = '/api/educations';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Education[]>(this.baseUrl).toPromise();
  }

  create(education: Education) {
    return this.http.post(this.baseUrl, education).toPromise();
  }

  get(id: string) {
    return this.http.get<Education>(`${this.baseUrl}/${id}`).toPromise();
  }

  update(education: Education) {
    return this.http.put(`${this.baseUrl}/${education.id}`, education).toPromise();
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`).toPromise();
  }
}
