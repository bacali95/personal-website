import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = '/api/user';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(this.baseUrl);
  }

  create(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  get(id: string) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  update(user: User) {
    return this.http.put(`${this.baseUrl}/${user._id}`, user);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
