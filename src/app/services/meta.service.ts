import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface MetaVentaResponse {
  meta: number;
  vendidos: number;
  progreso: number;
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private apiUrl = 'https://tiendacalvillo-production.up.railway.app/api'; // Cambia esta URL por la de tu servidor

  constructor(private http: HttpClient) {}

  getMetaDelDia(): Observable<MetaVentaResponse> {
    return this.http.get<MetaVentaResponse>(`${this.apiUrl}/meta`);
  }

  // Establecer la meta del día
  postMetadeldia(meta_contenedores: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/meta`, { meta_contenedores });
  }
}