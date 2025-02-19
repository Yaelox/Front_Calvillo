import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private apiUrl = 'http://localhost:3000/api/compras'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las compras
  getCompras(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Obtener una compra por ID
  getCompraById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Registrar una nueva compra
  registrarCompra(compra: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, compra);
  }

  // Actualizar el estado de una compra
  actualizarEstadoCompra(id: number, estado: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { estado });
  }

  // Eliminar una compra
  eliminarCompra(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
