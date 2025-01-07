import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PreventaService } from '../../services/preventa.service';

@Component({
  selector: 'app-preventa',
  templateUrl: './preventa.page.html',
  styleUrls: ['./preventa.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PreventaPage{

  constructor(private preventaService: PreventaService) { }

  // Función para encontrar la mejor ruta
  findBestRoute() {
    this.preventaService.getBestRoute().subscribe(route => {
      console.log('Ruta encontrada:', route);
      // Mostrar la ruta en el mapa o alertar al usuario
    });
  }

  // Función para ver los puntos de venta
  viewPoints() {
    this.preventaService.getPoints().subscribe(points => {
      console.log('Puntos de venta:', points);
      // Mostrar los puntos de venta en la pantalla
    });
  }
}
