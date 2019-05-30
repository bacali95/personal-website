import {Injectable} from '@angular/core';
import {NbAuthService} from '@nebular/auth';
import {HttpClient} from '@angular/common/http';
import {Category} from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private headers = {};
  private baseUrl: string = '/api/category';

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange().subscribe(token => {
      this.headers['Authorization'] = `Bearer ${token.getValue()}`;
    });
  }

  getAll() {
    return this.http.get<Category[]>(this.baseUrl, { headers: this.headers });
  }

  create(category: Category) {
    return this.http.post(this.baseUrl, category, { headers: this.headers });
  }

  get(id: string) {
    return this.http.get<Category>(`${this.baseUrl}/${id}`, {
      headers: this.headers,
    });
  }

  update(category: Category) {
    return this.http.put(`${this.baseUrl}/${category._id}`, category, {
      headers: this.headers,
    });
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}
