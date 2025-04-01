import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

interface Marker {
  lat: number;
  lon: number;
  name: string;
  state: string;
  frecuencia: 'Recurrente' | 'Poco recurrente' | 'Nada recurrentes';
}

@Component({
  selector: 'app-preventa-map',
  standalone:true,
  templateUrl: './preventa-map.component.html',
  styleUrls: ['./preventa-map.component.scss'],
})
export class PreventaMapComponent implements OnInit, OnChanges {
  @Input() markers: Marker[] = [];
  private map: L.Map | null = null;

  // Centro predeterminado: Calvillo, Aguascalientes
  private defaultLocation = { lat: 21.845076, lon: -102.719628, zoom: 20 };

  ngOnInit() {
    this.initializeMap();
    this.addDefaultMarker();
  }
  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['markers']?.currentValue) {
      this.updateMarkers();
    }
  }
  

  private initializeMap(): void {
    // Evitar inicializar el mapa más de una vez
    if (this.map) return;

    // Crear el mapa centrado en Calvillo, Aguascalientes
    this.map = L.map('map').setView(
      [this.defaultLocation.lat, this.defaultLocation.lon],
      this.defaultLocation.zoom
    );

    // Agregar capa de tiles ligera de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(this.map);
  }

  private addDefaultMarker(): void {
    if (!this.map) return;
  
    // Crear el marcador dorado para la tienda matriz
    const defaultMarker = L.marker(
      [this.defaultLocation.lat, this.defaultLocation.lon],
      {
        icon: L.divIcon({
          className: 'custom-icon gold', // Clase CSS personalizada para dorado
          html: '<div style="background-color: gold; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #DAA520;"></div>',
          iconSize: [20, 20], // Tamaño del icono
          popupAnchor: [0, -10],
        }),
      }
    )
      .addTo(this.map)
      .bindPopup(
        `<b>Tienda Crush de Calvillo</b><br>Matriz principal ubicada aquí.`
      );
  
    defaultMarker.openPopup(); // Abre el popup por defecto
  }

  private updateMarkers(): void {
    if (!this.map) return;

    // Eliminar marcadores existentes (excepto el marcador predeterminado)
    this.map.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.Marker && !layer.getPopup()?.getContent()) {
        this.map?.removeLayer(layer);
      }
    });

    // Agregar nuevos marcadores
    this.markers.forEach((marker) => {
      const markerIcon = this.getMarkerDivIcon(marker.frecuencia);

      L.marker([marker.lat, marker.lon], { icon: markerIcon })
        .addTo(this.map!)
        .bindPopup(
          `<b>${marker.name}</b><br>Lat: ${marker.lat.toFixed(4)}, Lon: ${marker.lon.toFixed(4)}`
        );
    });
  }

  private getMarkerDivIcon(frecuencia: Marker['frecuencia']): L.DivIcon {
    const colorMap = {
      Recurrente: 'green',
      'Poco recurrente': 'yellow',
      'Nada recurrentes': 'red',
    };
    const color = colorMap[frecuencia] || 'blue';

    return L.divIcon({
      className: `custom-icon ${color}`, // Clase CSS para colores
      iconSize: [16, 16], // Tamaño del icono
      popupAnchor: [0, -8],
    });
  }
}
