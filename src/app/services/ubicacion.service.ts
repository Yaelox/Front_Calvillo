import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ubicacion {
  id?: number;
  nombre_tienda: string;
  latitud: number;
  longitud: number;
  fecha_registro?:string;
}

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  private apiUrl = 'https://tiendacalvillo-production.up.railway.app/api/ubi'; // Reemplaza con tu URL real

  constructor(private http: HttpClient) {}

  // Obtener todas las ubicaciones
  getUbicaciones(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(this.apiUrl);
  }

  getUbicacionesConMotivo(): Observable<any[]> {
    return this.http.get<any[]>('https://tiendacalvillo-production.up.railway.app/api/ubi/motivo');
  }
  
  // Registrar nueva ubicación
  postUbicacion(ubicacion: Ubicacion): Observable<Ubicacion> {
    return this.http.post<Ubicacion>(this.apiUrl, ubicacion);
  }

  // Actualizar ubicación
  updateUbicacion(id: number, ubicacion: Ubicacion): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, ubicacion);
  }

  // Eliminar ubicación
  deleteUbicacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
