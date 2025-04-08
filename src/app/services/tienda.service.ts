import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tienda {
  id_tienda?: number;
  nombre_tienda: string;
  direccion: string;
  telefono?: string;
  email: string;
  id_usuario: number;
  fecha_registro?: string;
  frecuencia_visitas:string;
}

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  private baseUrl = 'https://tiendacalvillo-production.up.railway.app/api/tiendas'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  // Registrar una tienda
  createTienda(tienda: Tienda): Observable<Tienda> {
    return this.http.post<Tienda>(`${this.baseUrl}`, tienda);
  }

 // Obtener todos los usuarios
   getTiendas(): Observable<Tienda[]> {
     return this.http.get<Tienda[]>(`${this.baseUrl}`);
   }

   // Obtener un usuario por ID
     getTiendaById(id: number): Observable<Tienda> {
       return this.http.get<Tienda>(`${this.baseUrl}/${id}`);
     }
   
     // Actualizar un usuario
     updateTienda(id: number, user: Partial<Tienda>): Observable<Tienda> {
       return this.http.put<Tienda>(`${this.baseUrl}/${id}`, user);
     }
   
     // Eliminar un usuario
     deleteTienda(id: number): Observable<{ message: string }> {
       return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
     }
}
