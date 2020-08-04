import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asset } from '../model/asset';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private baseUrl: string = '/api/assets';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Asset[]>(this.baseUrl).toPromise();
  }

  create(asset: Asset) {
    return this.http.post(this.baseUrl, asset).toPromise();
  }

  get(id: string) {
    return this.http.get<Asset>(`${this.baseUrl}/${id}`).toPromise();
  }

  update(asset: Asset) {
    return this.http.put(`${this.baseUrl}/${asset._id}`, asset).toPromise();
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`).toPromise();
  }
}
