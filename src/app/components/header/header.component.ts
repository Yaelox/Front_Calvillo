import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true
})
export class HeaderComponent {

  constructor(private navCtrl: NavController) { }

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
