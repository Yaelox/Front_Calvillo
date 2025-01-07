import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PreventaService } from '../../services/preventa.service';
import * as L from 'leaflet';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-preventa',
  templateUrl: './preventa.page.html',
  styleUrls: ['./preventa.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [HeaderComponent],
})
export class PreventaPage implements OnInit {
  map!: L.Map;
  markersLayer: L.LayerGroup = L.layerGroup();

  constructor(private preventaService: PreventaService) { }

  ngOnInit() {
    this.initMap();
  }

  // Inicializa el mapa
  initMap() {
    // Crear el mapa
    this.map = L.map('map').setView([21.8707, -102.7247], 13); // Coordenadas iniciales (aproximadas para Calvillo)

    // Agregar la capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Agregar marcador inicial
    this.addMarker('C. Matamoros 408, Zona Centro, 20800 Calvillo, Ags.');
  }

  // Función para agregar marcador en una dirección
  addMarker(address: string) {
    // Convertir dirección a coordenadas (geocodificación)
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        // Centrar el mapa en la nueva ubicación y agregar marcador
        this.map.setView([lat, lon], 13);
        L.marker([lat, lon]).addTo(this.map)
          .bindPopup(`<b>Ubicación:</b><br>${address}`)
          .openPopup();
      })
      .catch(error => console.error('Error al obtener coordenadas:', error));
  }

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
