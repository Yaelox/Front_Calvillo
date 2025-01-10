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
  imports:[NgIf]
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private cartService: CartService
  ) { }

 
  ngOnInit() {
    // Suscribirse al contador del carrito
    this.cartService.getCartCount().subscribe((count) => {
      this.cartCount = count;
    });
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

  goToReparto() {
    this.navCtrl.navigateForward('/reparto');
  }

  goToRutas() {
    this.navCtrl.navigateForward('/rutas');
  }

  goToPuntos() {
    this.navCtrl.navigateForward('/puntos');
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
}
