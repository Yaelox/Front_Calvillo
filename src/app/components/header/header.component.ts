import { Component,OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  isDisabled = false;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private cartService: CartService
  ) { }

 
  ngOnInit() {
  }

  // Navegar al carrito
  goToCart() {
    this.router.navigate(['/carrito']);
  }

  goToHome() {
    this.navCtrl.navigateForward('/home');
  }

  goToPreventa() {
    this.navCtrl.navigateForward('/preventa');
  }

  goToContacto() {
    this.navCtrl.navigateForward('/contacto');
  }

  goToReparto() {
    this.navCtrl.navigateForward('/reparto-domicilio');
  }

  goToRutas() {
    this.navCtrl.navigateForward('/rutas-foraneas');
  }

  goToPuntos() {
    this.navCtrl.navigateForward('/puntosdeventa');
  }

  goToEventos() {
    this.navCtrl.navigateForward('/eventos');
  }

  goToTienda() {
    this.navCtrl.navigateForward('/tienda-online');
  }

  goToEnvios() {
    this.navCtrl.navigateForward('/envios');
  }

  goToCarrito() {
    this.router.navigate(['/carrito']); // Navega a la página del carrito
  }
}
