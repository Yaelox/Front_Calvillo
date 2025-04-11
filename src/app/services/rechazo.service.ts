
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RechazoService {
  private apiUrl = 'https://tiendacalvillo-production.up.railway.app/api/rechazo';
  private BaseUrl = 'https://tiendacalvillo-production.up.railway.app/api/rechazo-repartidores'; // Ajusta esto a tu backend

  constructor(private http: HttpClient) {}

 
  // Obtener todos los rechazos
  getRechazos() {
    return this.http.get(`${this.apiUrl}`);
  }

  // Obtener rechazo por ID
  getRechazoById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear rechazo
  crearRechazoCompra(data: { id_compranormal: number; descripcion: string }) {
    return this.http.post(`${this.apiUrl}`, data);
  }

  // Actualizar rechazo
  updateRechazo(id: number, data: { id_compranormal: number; descripcion: string }) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar rechazo
  deleteRechazo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }




  // ==== RECHAZOS DE VENTAS REPARTIDOR ====

  // Obtener todos los rechazos
  getRechazosRepartidores() {
    return this.http.get(`${this.BaseUrl}`);
  }

  // Obtener rechazo por ID
  getRechazoRepartidorById(id: number) {
    return this.http.get(`${this.BaseUrl}/${id}`);
  }

  // Crear rechazo repartidor
  crearRechazoRepartidor(data: { id_ventarepartidor: number; descripcion: string }) {
    return this.http.post(`${this.BaseUrl}`, data);
  }

  // Actualizar rechazo repartidor
  updateRechazoRepartidor(id: number, data: { id_ventarepartidor: number; descripcion: string }) {
    return this.http.put(`${this.BaseUrl}/${id}`, data);
  }

  // Eliminar rechazo repartidor
  deleteRechazoRepartidor(id: number) {
    return this.http.delete(`${this.BaseUrl}/${id}`);
  }
}
