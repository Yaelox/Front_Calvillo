import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api/events'; // URL de la API

  constructor(private http: HttpClient) {}

  registerEvent(eventData: any): Observable<any> {
    return this.http.post(this.apiUrl, eventData);
  }
}
