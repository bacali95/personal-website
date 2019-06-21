import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Skill} from '../model/skill';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private baseUrl: string = '/api/skill';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Skill[]>(this.baseUrl).toPromise();
  }

  create(skill: Skill) {
    return this.http.post(this.baseUrl, skill).toPromise();
  }

  get(id: string) {
    return this.http.get<Skill>(`${this.baseUrl}/${id}`).toPromise();
  }

  update(skill: Skill) {
    return this.http.put(`${this.baseUrl}/${skill._id}`, skill).toPromise();
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`).toPromise();
  }
}
