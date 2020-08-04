import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl: string = '/api/categories';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Category[]>(this.baseUrl).toPromise();
  }

  create(category: Category) {
    return this.http.post(this.baseUrl, category).toPromise();
  }

  get(id: string) {
    return this.http.get<Category>(`${this.baseUrl}/${id}`).toPromise();
  }

  update(category: Category) {
    return this.http.put(`${this.baseUrl}/${category._id}`, category).toPromise();
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`).toPromise();
  }
}
