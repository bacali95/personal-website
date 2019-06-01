import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadService {

  private baseUrl: string = '/api/project/postImage';

  constructor(private http: HttpClient) {
  }

  public uploadFile(formData) {
    return this.http.post<any>(this.baseUrl, formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return {status: event.type, body: progress};
          case HttpEventType.Response:
            return {status: event.type, body: event.body};
          default:
            return {status: event.type, body: null};
        }
      }),
    );
  }
}
