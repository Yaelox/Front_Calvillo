import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define la interfaz para un usuario
export interface User {
  id_usuario?: number;
  nombre: string;
  usuario: string;
  email: string;
  password: string;
  telefono: string;
  tipo_usuario: string;
  fecha_registro?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/usuarios'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  // Obtener el ID del usuario desde localStorage
  getUserIdFromLocalStorage(): number | null {
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        return user.id_usuario ?? null; // Devuelve `null` si no existe `id_usuario`
      }
    } catch (error) {
      console.error('Error al leer el usuario de localStorage:', error);
    }
    return null; // Devuelve `null` si no hay usuario en localStorage
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // Actualizar un usuario
  updateUser(id: number, user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}/${id}`, user, { headers });
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
