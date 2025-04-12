import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RegistrarUbicacionComponent } from 'src/app/components/registrarubicacion/registrarubicacion.component';
import { UbicacionesService, Ubicacion } from 'src/app/services/ubicacion.service';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
  imports: [CommonModule, IonicModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UbicacionPage implements OnInit, AfterViewInit {
  private map: L.Map | undefined;
  private currentLat!: number;
  private currentLon!: number;
  ubicaciones: any[] = [];

  constructor(
    private modalController: ModalController,
    private ubicacionesService: UbicacionesService
  ) {}

  ngOnInit() {
    this.ubicacionesService.getUbicacionesConMotivo().subscribe({
      next: (data) => {
        this.ubicaciones = data;
      },
      error: (err) => {
        console.error('Error cargando ubicaciones con motivo', err);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 0); // Usar un pequeño retraso para asegurar que el DOM esté listo
  }
  private initMap(): void {
    if (this.map) {
      this.map.remove();
    }
  
    const agsLat = 21.8818;
    const agsLon = -102.2910;
  
    this.map = L.map('map', {
      center: [agsLat, agsLon],
      zoom: 12,
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
  
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 300);
  
    this.loadUbicaciones();
  }
  
  getLocationAndAddMarker(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLat = position.coords.latitude;
          this.currentLon = position.coords.longitude;

          L.marker([this.currentLat, this.currentLon], {
            icon: L.icon({
              iconUrl: 'assets/images/blue_marker.png', // Marcador azul
              iconSize: [40, 50],
              iconAnchor: [20, 50],
            }),
          })
            .addTo(this.map!)
            .bindPopup('Tu ubicación actual')
            .openPopup();

          this.map?.setView([this.currentLat, this.currentLon], 14);
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error);
        }
      );
    } else {
      alert('Geolocalización no soportada.');
    }
  }

  async registrarUbicacion() {
    if (!this.currentLat || !this.currentLon) {
      alert('Primero obtén tu ubicación.');
      return;
    }

    const modal = await this.modalController.create({
      component: RegistrarUbicacionComponent,
      componentProps: {
        lat: this.currentLat,
        lon: this.currentLon,
      },
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data?.confirmado) {
      const { nombre_tienda, lat, lon } = data.data;

      // Crear objeto para enviar
      const nuevaUbicacion: Ubicacion = {
        nombre_tienda: nombre_tienda,
        latitud: lat,
        longitud: lon,
      };

      // Consumir servicio para registrar en la base de datos
      this.ubicacionesService.postUbicacion(nuevaUbicacion).subscribe({
        next: (respuesta) => {
          console.log('Ubicación registrada en BD:', respuesta);

          // Cargar las ubicaciones nuevamente después de registrar
          this.loadUbicaciones();
        },
        error: (err) => {
          console.error('Error al registrar ubicación en BD:', err);
        },
      });
    }
  }
  
  getIconUrlByMotivo(motivo: string): string {
    switch (motivo) {
      case 'Motivo_Rojo':
        return 'assets/images/red.png';
      case 'Motivo_Naranja':
        return 'assets/images/amarillo.png';
      case 'Motivo_Verde':
        return 'assets/images/verde.png';
      case 'Motivo_Azul':
      default:
        return 'assets/images/blue.png';
    }
  }
  
  getTextColorByMotivo(motivo: string): string {
    switch (motivo) {
      case 'Motivo_Rojo':
        return 'red';
      case 'Motivo_Naranja':
        return 'orange';
      case 'Motivo_Verde':
        return 'green';
      default:
        return 'blue';
    }
  }
  abrirRutaEnGoogleMaps(): void {
    if (!navigator.geolocation) {
      alert('La geolocalización no es compatible con este dispositivo.');
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLat = position.coords.latitude;
        const currentLon = position.coords.longitude;
        const origin = `${currentLat},${currentLon}`;
  
        this.ubicacionesService.getUbicacionesConMotivo().subscribe({
          next: (ubicaciones) => {
            if (ubicaciones.length < 1) {
              alert('No hay ubicaciones suficientes para trazar una ruta.');
              return;
            }
  
            const destination = `${ubicaciones[ubicaciones.length - 1].latitud},${ubicaciones[ubicaciones.length - 1].longitud}`;
            
            const waypoints = ubicaciones
              .slice(0, -1)
              .map(u => `${u.latitud},${u.longitud}`)
              .join('|');
  
            const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
            window.open(url, '_blank');
          },
          error: (err) => {
            console.error('Error obteniendo ubicaciones para Google Maps:', err);
          }
        });
      },
      (error) => {
        console.error('Error obteniendo la ubicación actual:', error);
        alert('No se pudo obtener tu ubicación actual.');
      }
    );
  }
  
  
  loadUbicaciones(): void {
    this.ubicacionesService.getUbicacionesConMotivo().subscribe({
      next: (ubicaciones) => {
        // Borrar los marcadores previos (excepto el tile layer base)
        this.map?.eachLayer((layer) => {
          if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            this.map?.removeLayer(layer);
          }
        });
  
        // Declarar 'coordinates' como un arreglo de tuplas [number, number]
        const coordinates: [number, number][] = [];  // Tipo explícito
  
        // Agregar los nuevos marcadores y coordinar las ubicaciones para la ruta
        ubicaciones.forEach((ubicacion) => {
          const googleMapsUrl = `https://www.google.com/maps?q=${ubicacion.latitud},${ubicacion.longitud}`;
          const iconColor = this.getIconUrlByMotivo(ubicacion.motivo);
  
          // Crear el marcador
          const marker = L.marker([ubicacion.latitud, ubicacion.longitud], {
            icon: L.icon({
              iconUrl: iconColor,
              iconSize: [40, 50],
              iconAnchor: [20, 50],
            }),
          }).addTo(this.map!);
  
          // Agregar el popup con el enlace a Google Maps
          marker.bindPopup(`
            <strong>${ubicacion.nombre_tienda}</strong><br>
            <strong>${new Date(ubicacion.fecha_registro).toLocaleString()}</strong><br>
            <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer">Ver en Google Maps</a>
          `);
  
          // Agregar las coordenadas de la ubicación al arreglo de coordenadas
          coordinates.push([ubicacion.latitud, ubicacion.longitud]);
        });
  
        // Dibujar la ruta si hay al menos 2 ubicaciones
        if (coordinates.length > 1) {
          const route = L.polyline(coordinates, {
            color: 'blue', // Puedes cambiar el color de la ruta aquí
            weight: 4,     // Grosor de la línea
            opacity: 0.7,  // Opacidad de la línea
          }).addTo(this.map!);
  
          // Ajustar el mapa para que la ruta completa se vea
          this.map?.fitBounds(route.getBounds());
        }
      },
      error: (err) => {
        console.error('Error al cargar las ubicaciones con motivo:', err);
      },
    });
  }
}  

