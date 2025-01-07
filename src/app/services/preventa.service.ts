import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreventaService {

  private apiUrl = 'http://localhost:3000'; // Cambia esto con la URL de tu backend

  constructor(private http: HttpClient) { }

  // Obtener la mejor ruta
  getBestRoute(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/best-route`);
  }

  // Obtener los puntos de venta
  getPoints(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/points`);
  }
}
