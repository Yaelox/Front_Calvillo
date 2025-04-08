
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  private apiUrl = 'https://tiendacalvillo-production.up.railway.app/api';  // URL de la API del backend

  constructor(private http: HttpClient) {}

  // Obtener ventas por zona
  getVentasPorZona(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ventas-zona`);
  }

  // obtener ventas por Mes
  getVentasPorMes(): Observable<any>{
    return this.http.get(`${this.apiUrl}/ventas-mes`)
  }
  
    // obtener ventas por Semana
    getVentasPorSemana(): Observable<any>{
      return this.http.get(`${this.apiUrl}/ventas-semana`)
    }

     // obtener ventas por Año
     getVentasPorAño(): Observable<any>{
      return this.http.get(`${this.apiUrl}/ventas-ano`)
    }
    
     // obtener ventas por Mes
     getVentasPorDia(): Observable<any>{
      return this.http.get(`${this.apiUrl}/ventas-dia`)
    }
    
     // obtener ventas por Mes
     getProductoMasVendido(): Observable<any>{
      return this.http.get(`${this.apiUrl}/producto-mas-vendido`)
    }
    
    
  // Obtener el producto más vendido por zona
  getProductoMasVendidoPorZona(): Observable<any> {
    return this.http.get(`${this.apiUrl}/producto-mas-vendido-zona`);
  }
}
