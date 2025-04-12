import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export interface VentaDetalle {
  id_venta_detalle: number;
  producto_id: number;
  nombre_producto: string; 
  descripcion?:string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

export interface Venta {
  id_venta: number;
  repartidor_id: number;
  tienda_id: number;
  total: number;
  fecha_venta: string;
  foto_venta: string;
  motivo:string;
  id_ubicacion:number;
  nombre_repartidor?: string;
  nombre_tienda?: string;
  rechazado?: boolean; 
  propietario_tienda?: string;
  detalles: VentaDetalle[];
}



@Injectable({
  providedIn: 'root'
})
export class RepartidorService {
  private apiUrl = 'https://tiendacalvillo-production.up.railway.app/api/repartidor'; // Ajusta esta URL según tu backend

  constructor(private http: HttpClient) {}
  registrarVenta(venta: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, venta).pipe(
      catchError((error) => {
        console.error('Error al registrar la venta:', error);
        return throwError(() => error);  // Re-lanzamos el error para que pueda ser manejado en el componente
      })
    );
  }
  

  obtenerVentasPorRepartidor(id: number): Observable<Venta[]> {
    console.log(`Obteniendo ventas para el repartidor con id: ${id}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.ventas) // Aquí accedemos a la propiedad 'ventas'
    );
  }  

  obtenerTodasLasVentas(): Observable<Venta[]> { // Cambié el tipo de retorno a Venta[]
    return this.http.get<Venta[]>(`${this.apiUrl}`);
  }

  actualizarVenta(id: number, venta: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, venta);
  }

  eliminarVenta(id_venta: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_venta}`);
  }
}