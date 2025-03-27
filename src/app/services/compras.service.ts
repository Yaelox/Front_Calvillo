import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// Definir un tipo de datos para los pedidos
export interface Pedido {
  id_compra: number;
  usuario_id: number;
  total: number;
  metodo_pago: string;
  nombre_completo: string;
  direccion: string;
  ciudad: string;
  codigo_postal: string;
  latitud: number;
  longitud: number;
  fecha_compra: string;
  estado: string;
  productos: {
    id_compra_detalle: number;
    producto_id: number;
    nombre: string; // 👈 Asegúrate de que se incluya el nombre del producto
    cantidad: number;
    imagen:string;
    precio_unitario: number;
    subtotal: number;
  }[];
}


@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private apiUrl = 'http://localhost:3000/api/compras';
  private baseUrl = 'http://localhost:3000/api/detalles'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las compras
  getCompras(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getPedidosConDetalles(): Observable<any> {
    return this.http.get<Pedido[]>(this.baseUrl);
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
