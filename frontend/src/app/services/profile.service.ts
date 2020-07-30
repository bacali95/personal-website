import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../model/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl: string = '/api/profile';

  constructor(private http: HttpClient) {}

  getCurrent() {
    return this.http.get<Profile>(`${this.baseUrl}`).toPromise();
  }

  update(user: Profile) {
    return this.http.put(`${this.baseUrl}`, user).toPromise();
  }
}
