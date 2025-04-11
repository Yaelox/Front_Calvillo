import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Foto {
  foto_id?:number;
  titulo: string;
  imagen: string;
  id_usuario: number;
  fecha_subida?:string;
}

@Injectable({
  providedIn: 'root',
})
export class FotoService {
  private apiUrl = 'https://tiendacalvillo-production.up.railway.app/api/foto';
  private BaseUrl = 'https://tiendacalvillo-production.up.railway.app/api'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  getFotos(): Observable<Foto[]> {
    return this.http.get<Foto[]>(this.apiUrl);
  }
  postFoto(foto: Foto): Observable<Foto> {
    return this.http.post<Foto>(this.apiUrl, foto);
  }

  getFotoById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getFotosAgrupadas(): Observable<any> {
    return this.http.get(`${this.BaseUrl}/fotos`);
  }
  
    //// Actualizar una foto existente
  updateFoto(foto: Foto): Observable<Foto> {
    return this.http.put<Foto>(`${this.apiUrl}/${foto.foto_id}`, foto);
  }

  // Eliminar una foto
  deleteFoto(id_foto: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_foto}`);
  }
}