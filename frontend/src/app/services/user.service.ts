import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private headers = {};
  private baseUrl: string = '/api/user';

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange().subscribe(token => {
      this.headers['Authorization'] = `Bearer ${token.getValue()}`;
    });
  }

  getAll() {
    return this.http.get<User[]>(this.baseUrl, { headers: this.headers });
  }

  create(user: User) {
    return this.http.post(this.baseUrl, user, { headers: this.headers });
  }

  get(id: string) {
    return this.http.get<User>(`${this.baseUrl}/${id}`, {
      headers: this.headers,
    });
  }

  update(user: User) {
    return this.http.put(`${this.baseUrl}/${user._id}`, user, {
      headers: this.headers,
    });
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}
