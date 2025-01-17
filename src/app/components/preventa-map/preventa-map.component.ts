import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

interface Marker {
  lat: number;
  lon: number;
  name: string;
  state:string;
  frecuencia: 'Recurrente'| 'Poco recurrente'|'Nada recurrentes';
}

@Component({
  selector: 'app-preventa-map',
  templateUrl: './preventa-map.component.html',
  styleUrls: ['./preventa-map.component.scss']
})
export class PreventaMapComponent implements OnInit, OnChanges {

  @Input() markers: Marker[] = [];

  map: any;

  ngOnInit() {
    // Inicializar el mapa
    this.map = L.map('map').setView([19.4326, -99.1332], 12);  // Ubicación predeterminada en Ciudad de México

    // Añadir capa de tiles (mapa de OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['markers'] && changes['markers'].currentValue) {  // Acceder a markers usando ['markers']
      this.updateMarkers();
    }
  }

  updateMarkers() {
    // Eliminar los marcadores anteriores
    this.map.eachLayer((layer: L.Layer) => {  // Aquí definimos el tipo correcto de `layer`
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

     // Añadir los nuevos marcadores
     this.markers.forEach(marker => {
      // Definir el color según la frecuencia
      let markerColor: string;

      switch (marker.frecuencia) {
        case 'Recurrente':
          markerColor = 'green';  // Marcador verde para frecuente
          break;
        case 'Poco recurrente':
          markerColor = 'yellow';  // Marcador amarillo para poco frecuente
          break;
        case 'Nada recurrentes':
          markerColor = 'red';  // Marcador rojo para nada frecuente
          break;
        default:
          markerColor = 'blue';  // Por defecto azul
          break;
      }

      // Crear un marcador con el color determinado
      const markerIcon = L.icon({
        iconUrl: `https://www.iconfinder.com/icons/1976607/marker_${markerColor}.png`,  // Puedes usar imágenes de iconos con el color
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      // Añadir el marcador al mapa con su icono
      L.marker([marker.lat, marker.lon], { icon: markerIcon }).addTo(this.map)
        .bindPopup(`<b>${marker.name}</b><br>Lat: ${marker.lat}, Lon: ${marker.lon}`);
    });
  }
}
