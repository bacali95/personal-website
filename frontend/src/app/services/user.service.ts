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

  getCurrent() {
    return this.http.get<User>(`${this.baseUrl}`).toPromise();
  }

  update(user: User) {
    return this.http.put(`${this.baseUrl}`, user).toPromise();
  }

}
