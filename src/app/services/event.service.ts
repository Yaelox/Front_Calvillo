import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'https://tiendacalvillo-production.up.railway.app/api/evento';  // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todos los eventos
  getEventos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Obtener un evento por ID
  getEventoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo evento
  createEvento(evento: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, evento);
  }

  // Actualizar un evento
  updateEvento(id: number, evento: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, evento);
  }

  // Eliminar un evento
  deleteEvento(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
