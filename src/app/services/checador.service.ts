import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecadorService {
  private apiUrl = 'http://localhost:3000/api/checador'; // URL de tu API

  constructor(private http: HttpClient) {}

  registrarEntrada(usuario_id: number, latitud: number, longitud: number, horaEntrada: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { usuario_id, latitud, longitud, horaEntrada };
    console.log('Enviando:', body); // 👀 Verifica lo que se envía

    return this.http.post(`${this.apiUrl}/entrada`, body, { headers });
  }

  registrarSalida(usuario_id: number, latitud: number, longitud: number, horaSalida: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { usuario_id, latitud, longitud, horaSalida };
    console.log('Enviando:', body); // 👀 Verifica lo que se envía

    return this.http.post(`${this.apiUrl}/salida`, body, { headers });
  }

  // Método para obtener el historial de todos los usuarios
  obtenerHistorial() {
    return this.http.get<any[]>(`${this.apiUrl}/historial`); // Asegúrate de que esta ruta esté configurada en el backend
  }

  eliminarRegistro(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
