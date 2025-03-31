import { Injectable } from '@angular/core';
import axios from 'axios';  // Import Axios
import { Observable, from } from 'rxjs';  // from() converts promise to observable

export interface User {
  id_usuario?: number;
  nombre: string;
  usuario: string;
  password: string;
  email: string;
  telefono: string;
  tipo_usuario: string;
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
  private apiUrl = 'http://localhost:3000/api';  // Your API base URL

  constructor() {}

  // Register user (POST request)
  registerUser(user: User): Observable<User> {
    return from(axios.post(`${this.apiUrl}/register`, user).then(response => response.data));
  }

  // Login function (POST request using Axios)
  login(email: string, password: string): Observable<LoginResponse> {
    const payload = { email, password };

    // Using Axios to make the POST request
    return from(
      axios.post(`${this.apiUrl}/login`, payload)
        .then(response => {
          const data = response.data as LoginResponse;
          
          // Handle response and store user data in localStorage
          if (data && data.user) {
            console.log('ID de usuario recibido:', data.user.id_usuario);
            if (data.user.id_usuario !== undefined && data.user.id_usuario !== null) {
              localStorage.setItem('token', data.token);
              localStorage.setItem('user', JSON.stringify(data.user));
              localStorage.setItem('tipo_usuario', data.user.tipo_usuario);
              localStorage.setItem('id_usuario', data.user.id_usuario.toString());
              console.log('Usuario almacenado en localStorage:', data.user);
            } else {
              console.error('Error: id_usuario está indefinido o nulo en la respuesta del backend.');
            }
          } else {
            console.error('Error: No se recibió el usuario en la respuesta del backend.');
          }
          return data;  // Returning the LoginResponse for further usage
        })
        .catch(error => {
          console.error('Error en la solicitud de login:', error);
          throw error;  // Rethrow the error to be caught by the component
        })
    );
  }

  // Logout function
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tipo_usuario');
    localStorage.removeItem('id_usuario');
  }

  saveUserToLocalStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Check if the user is admin
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.tipo_usuario === 'administrador';
  }

  // Check if the user is a client
  isCliente(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.tipo_usuario === 'cliente';
  }
}
