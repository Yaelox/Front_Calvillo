import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id_usuario?: number;
  nombre:string;
  usuario: string;
  password: string;
  email: string;
  telefono:string;
  tipo_usuario: string;
  fecha_registro?: string;

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

  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(`${this.apiUrl}/login`, payload);
  }
}
