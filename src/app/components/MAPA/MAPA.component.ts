import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-MAPA',
  templateUrl: './MAPA.component.html',
  styleUrls: ['./MAPA.component.scss'],
})
export class MAPAPage implements OnInit {
  private map: L.Map | undefined;

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Inicializar el mapa con las coordenadas predeterminadas
    this.map = L.map('map', { zoomControl: true }).setView([20.659, -103.349], 12); // Coordenadas por defecto

    // Cargar el mapa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
  }

  getLocationAndAddMarker(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log('Ubicación actual:', lat, lon);

          // Agregar un marcador en la ubicación actual
          L.marker([lat, lon])
            .addTo(this.map!)
            .bindPopup('Tu ubicación actual')
            .openPopup();

          // Centrar el mapa en la ubicación actual
          this.map?.setView([lat, lon], 14);

          // Guardar la información de la ubicación (puedes enviarla a un servidor o almacenarla localmente)
          this.saveLocationInfo(lat, lon);
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error);
        }
      );
    } else {
      alert('La geolocalización no está soportada en este navegador.');
    }
  }

  private saveLocationInfo(lat: number, lon: number): void {
    // Aquí puedes guardar la información de la ubicación en una base de datos o mostrarla en el frontend.
    // Ejemplo: guardarla en el localStorage o enviarla a un servidor
    console.log('Información de ubicación guardada:', { lat, lon });

    // Si deseas almacenarla en localStorage:
    localStorage.setItem('ubicacion', JSON.stringify({ lat, lon }));
  }
}