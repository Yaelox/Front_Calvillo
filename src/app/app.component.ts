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
 
 isAdmin: boolean = false;
 
 ngOnInit() {
  setTimeout(() => {
    const userType = localStorage.getItem('tipo_usuario');
    this.isAdmin = userType === 'administrador';
    console.log("Usuario logueado como:", userType);
  }, 100);  // Pequeño retraso para asegurarnos de obtener los datos correctos
}
   // Métodos para navegar entre las páginas
   goToUser() {
     this.router.navigate(['/usuarios']);
   }
   // Métodos para navegar entre las páginas
   goToPedidos() {
    this.router.navigate(['/check-pedidos']);
  }
 
   goToPreventa() {
     this.router.navigate(['/preventa']);
   }

   goToHistorial() {
    this.router.navigate(['/check-historial']);
  }

  

   goToHome() {
    this.router.navigate(['/home']);
  }


   goToMisPedidos(){
    this.router.navigate(['/mis-pedidos'])
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
 
   goToPoster() {
     this.router.navigate(['/check-eventos']);
   }
   goToEventos() {
    this.router.navigate(['/admin-eventos']);
  }
 
   goToTienda() {
     this.router.navigate(['/tiendas']);
   }
 
   goToEnvios() {
     this.router.navigate(['/envios']);
   }
 
   goToContacto() {
     this.router.navigate(['/check-contactos']);
   }
  }