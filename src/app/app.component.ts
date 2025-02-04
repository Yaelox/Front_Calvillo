import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
 constructor(private router: Router) {}
 
   // Métodos para navegar entre las páginas
   goToUser() {
     this.router.navigate(['/usuarios']);
   }
 
   goToPreventa() {
     this.router.navigate(['/preventa']);
   }
 
   goToConfiguracion() {
     this.router.navigate(['/configuracion']);
   }
 
   goToReparto() {
     this.router.navigate(['/reparto']);
   }
 
   goToRutas() {
     this.router.navigate(['/rutas']);
   }
 
   goToPuntos() {
     this.router.navigate(['/puntos']);
   }
 
   goToEventos() {
     this.router.navigate(['/eventos']);
   }
 
   goToTienda() {
     this.router.navigate(['/tienda']);
   }
 
   goToEnvios() {
     this.router.navigate(['/envios']);
   }
 
   goToContacto() {
     this.router.navigate(['/contacto']);
   }
  }