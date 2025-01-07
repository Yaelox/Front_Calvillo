import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventaService {

  private apiUrl = 'https://api.mistore.com';  // Reemplaza con tu URL real

  constructor(private http: HttpClient) {}

  // Obtener los puntos de venta
  getPoints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/points`);
  }

  // Obtener la mejor ruta
  getBestRoute(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bestRoute`);
  }
}
