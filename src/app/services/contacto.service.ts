import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = 'http://localhost:3000/api/contacto'; // Reemplaza <puerto> con el puerto de tu backend

  constructor(private http: HttpClient) {}

  // Crear un nuevo contacto
  createContacto(contacto: { nombre: string; email: string; descripcion: string}): Observable<any> {
    return this.http.post(this.apiUrl, contacto);
  }

  // Obtener todos los contactos
  getContactos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un contacto por ID
  getContactoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Actualizar un contacto
  updateContacto(id: number, contacto: { nombre: string; email: string; descripcion: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contacto);
  }

  // Eliminar un contacto
  deleteContacto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
