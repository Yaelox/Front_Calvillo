import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  private apiUrl = 'http://localhost:3000/api/contacto'; // URL de tu backend
  private contactosSource = new BehaviorSubject<any[]>([]);  // Mantenemos el estado de los contactos
  contactos$ = this.contactosSource.asObservable();  // Observable que emite los cambios de la lista

  constructor(private http: HttpClient) {}

  // Obtener todos los contactos
  getContactos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap((contactos) => {
        this.contactosSource.next(contactos); // Emitimos la nueva lista de contactos
      }),
      catchError((error) => {
        console.error('Error al obtener los contactos:', error);
        throw error; // Re-emitir error
      })
    );
  }

  // Crear un nuevo contacto
  createContacto(contacto: { nombre: string; email: string; descripcion: string }): Observable<any> {
    return this.http.post(this.apiUrl, contacto).pipe(
      tap(() => {
        // Después de crear el contacto, actualizamos la lista de contactos
        this.refreshContactos();
      }),
      catchError((error) => {
        console.error('Error al crear el contacto:', error);
        throw error;
      })
    );
  }

  // Actualizar un contacto
  updateContacto(
    id: number,
    contacto: { nombre: string; email: string; descripcion: string; id_usuario: number }
  ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, contacto).pipe(
      tap(() => {
        // Después de actualizar el contacto, refrescamos la lista
        this.refreshContactos();
      }),
      catchError((error) => {
        console.error('Error al actualizar el contacto:', error);
        throw error;
      })
    );
  }

  // Eliminar un contacto
  deleteContacto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        // Después de eliminar, refrescamos la lista de contactos
        this.refreshContactos();
      }),
      catchError((error) => {
        console.error('Error al eliminar el contacto:', error);
        throw error;
      })
    );
  }

  // Método para recargar la lista de contactos
  refreshContactos() {
    this.getContactos().subscribe(); // Recarga la lista de contactos desde la API
  }
}
