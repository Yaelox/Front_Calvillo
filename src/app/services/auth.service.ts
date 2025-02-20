import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id_usuario?: number;
  nombre: string;
  usuario: string;
  password: string;
  email: string;
  telefono: string;
  tipo_usuario: string; // admin, cliente, etc.
  fecha_registro?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id_usuario: number;
    nombre: string;
    usuario: string;
    email: string;
    telefono: string;
    tipo_usuario: string;
    fecha_registro: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Cambia esta URL según tu backend

  constructor(private http: HttpClient) {}

  // Registrar una tienda
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // Login
  login(email: string, password: string): Observable<LoginResponse> {
    const payload = { email, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload).pipe(
      tap((response: LoginResponse) => {
        console.log('Respuesta completa del backend:', response); // Verifica toda la respuesta
  
        if (response && response.user) {
          console.log('ID de usuario recibido:', response.user.id_usuario); // 👀 Verifica aquí
  
          if (response.user.id_usuario !== undefined && response.user.id_usuario !== null) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('tipo_usuario', response.user.tipo_usuario);
            localStorage.setItem('id_usuario', response.user.id_usuario.toString()); // 👀 Se almacena aquí
            console.log('Usuario almacenado en localStorage:', response.user);
          } else {
            console.error('Error: id_usuario está indefinido o nulo en la respuesta del backend.');
          }
        } else {
          console.error('Error: No se recibió el usuario en la respuesta del backend.');
        }
      })
    );
  }
  
  
  logout() {
    localStorage.removeItem('token');  // Elimina el token
    localStorage.removeItem('user');  
    localStorage.removeItem('tipo_usuario')
    localStorage.removeItem('id_usuario') // Elimina los datos del usuario
  }

  // Guardar los datos del usuario en localStorage
  saveUserToLocalStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));  // Guardamos el usuario completo
  }

  // Verificar si el usuario es admin
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.tipo_usuario === 'administrador'; // Asegúrate de que el valor sea el correcto según tu backend
  }

  // Verificar si el usuario es cliente
  isCliente(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.tipo_usuario === 'cliente'; // Asegúrate de que el valor sea el correcto según tu backend
  }
}
