import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Foto {
  foto_id: number;
  titulo: string;
  imagen: string;
  id_usuario: number;
}

@Injectable({
  providedIn: 'root',
})
export class FotoService {
  private apiUrl = 'https://tiendacalvillo-production.up.railway.app/api/fotos'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  getFotos(): Observable<Foto[]> {
    return this.http.get<Foto[]>(this.apiUrl);
  }
  postFoto(foto: Foto): Observable<Foto> {
    return this.http.post<Foto>(this.apiUrl, foto);
  }
}