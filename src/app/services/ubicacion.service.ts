import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ubicacion {
  id?: number;
  nombre_tienda: string;
  latitud: number;
  longitud: number;
  fecha_registro?:string;
  motivo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  private apiUrl = 'https://tiendacalvillo-production.up.railway.app/api/ubi';
  private BaseUrl = 'https://tiendacalvillo-production.up.railway.app/api/ubicacion';  // Reemplaza con tu URL real

  constructor(private http: HttpClient) {}

  // Método para actualizar el motivo de una ubicación
  actualizarMotivo(id: number, motivo: string): Observable<any> {
    return this.http.put(`${this.BaseUrl}/${id}`, { motivo });
  }

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
