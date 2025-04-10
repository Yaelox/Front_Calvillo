import { Component,OnInit} from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:true,
  imports:[RouterModule,IonicModule,CommonModule],
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  isDisabled = false;

  isAdmin: boolean = false;
  isRepartidor: boolean = false;
  isEmpleado: boolean = false;
  isCliente: boolean = false;


  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const userType = localStorage.getItem('tipo_usuario');
    this.isAdmin = userType === 'administrador';
    this.isRepartidor = userType === 'repartidor';
    this.isEmpleado = userType === 'empleado';
    this.isCliente = userType === 'cliente';
  
    console.log("Usuario logueado como:", userType);
  }
  
  goToFotos() {
    this.router.navigate(['/fotos']);
  }

  goToRepartidor() {
    this.router.navigate(['/ventas-repartidor']);
  }
  // Navegar al carrito
  goToCart() {
    this.router.navigate(['/carrito']);
  }

  goToRechazos() {
    this.router.navigate(['/rechazos']);
  }

  goToHome() {
    this.navCtrl.navigateForward('/home');
  }

  goToReloj() {
    this.navCtrl.navigateForward('/checador');
  }

  goToInventario() {
    this.navCtrl.navigateForward('/inventario');
  }

  goToPreventa() {
    this.navCtrl.navigateForward('/preventa');
  }

  goToContacto() {
    this.navCtrl.navigateForward('/contacto');
  }

  /*goToEventos() {
    this.navCtrl.navigateForward('/eventos');
  } */

  goToTienda() {
    this.navCtrl.navigateForward('/tienda-online');
  }

  goToCarrito() {
    this.router.navigate(['/carrito']); // Navega a la página del carrito
  }

  goToConfig(){
    this.router.navigate(['/configuracion']);
  }

  onLogout() {
    this.authService.logout();  // Llama al método de logout
    this.navCtrl.navigateRoot('/login');  // Redirige a la página de login después de cerrar sesión
  }
}
