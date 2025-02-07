import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Poster {
  id_eventos: number;
  nombre: string;
  fecha: string;
  descripcion: string;
  ubicacion: string;

}

@Injectable({
  providedIn: 'root',
})
export class PosterService {
  private apiUrl = 'http://localhost:3000/api/poster';  // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todos los eventos
  getPoster(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Obtener un evento por ID
  getPosterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo evento
  createPoster(evento: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, evento);
  }

  // Actualizar un evento
  updatePoster(id: number, poster: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, poster);
  }

  // Eliminar un evento
  deletePoster(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
