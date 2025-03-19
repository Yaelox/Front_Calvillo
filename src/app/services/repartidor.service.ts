import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepartidorService {

  private apiUrl = 'http://localhost:3000/api/repartidor'; // Ajusta esta URL según tu backend

  constructor(private http: HttpClient) {}

  // Registrar venta
  registrarVenta(venta: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, venta);
  }

  // Obtener ventas por repartidor
  obtenerVentasPorRepartidor(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Obtener todas las ventas
  obtenerTodasLasVentas(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Actualizar venta
  actualizarVenta(id: number, venta: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, venta);
  }

  // Eliminar venta
  eliminarVenta(id_venta: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_venta}`);
  }
}