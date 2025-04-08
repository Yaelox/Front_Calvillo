import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interfaz Categoria para tipado de datos
export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string; // Imagen en formato base64 o URL
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'https://tiendacalvillo-production.up.railway.app/api/categoria'; // URL de la API

  constructor(private http: HttpClient) {}

  // Obtener todos los Categoriaos
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl).pipe(
      catchError(this.handleError) // Captura y maneja errores
    );
  }

  // Obtener un Categoriao por ID
  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Crear un nuevo Categoriao
  createCategoria(Categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, Categoria).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un Categoriao existente
  updateCategoria(id: number, Categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, Categoria).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un Categoriao
  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any) {
    console.error('Ocurrió un error: ', error);
    return throwError('Algo salió mal, por favor intenta nuevamente más tarde.');
  }
}
