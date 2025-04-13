import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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
  private baseUrl = 'https://tiendacalvillo-production.up.railway.app/api/usuarios';
  private apiUrl = 'https://tiendacalvillo-production.up.railway.app/api/actualizar'; // URL para actualizar

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
        return user.id_usuario ?? null;
      }
    } catch (error) {
      console.error('Error al leer el usuario de localStorage:', error);
    }
    return null;
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // Actualizar un usuario
  updateUser(id: number, user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}/${id}`, user, { headers }).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para actualizar la contraseña
  actualizar(email: string, password: string): Observable<any> {
    const body = { email, password };

    // Puedes agregar cabeceras si son necesarias (ej. para autorización)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(this.apiUrl, body, { headers }).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para manejar errores en la solicitud HTTP
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, ` + 
                     `Mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage); // Lanza un observable con el error
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
