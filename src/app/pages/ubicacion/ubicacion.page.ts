import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RegistrarUbicacionComponent } from 'src/app/components/registrarubicacion/registrarubicacion.component';
import { UbicacionesService, Ubicacion } from 'src/app/services/ubicacion.service';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ModalcolorComponent } from 'src/app/components/modalcolor/modalcolor.component';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
  imports: [CommonModule, IonicModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UbicacionPage implements OnInit, AfterViewInit {
  private map!: L.Map;
  currentLat!: number;
  currentLon!: number;
  ubicaciones: Ubicacion[] = [];

  constructor(
    private modalController: ModalController,
    private ubicacionesService: UbicacionesService
  ) {}

  ngOnInit() {
    this.cargarUbicaciones();
  }

  ngAfterViewInit() {
    setTimeout(() => this.initMap(), 0);
  }

  private initMap(): void {
    if (this.map) {
      this.map.remove();
    }

    const center: L.LatLngExpression = [21.8818, -102.2910];

    this.map = L.map('map', {
      center,
      zoom: 12
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    setTimeout(() => this.map.invalidateSize(), 300);
  }

  getLocationAndAddMarker(): void {
    if (!navigator.geolocation) {
      alert('Geolocalización no soportada.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.currentLat = pos.coords.latitude;
        this.currentLon = pos.coords.longitude;

        L.marker([this.currentLat, this.currentLon], {
          icon: L.icon({
            iconUrl: 'assets/images/blue_marker.png',
            iconSize: [40, 50],
            iconAnchor: [20, 50],
          })
        }).addTo(this.map)
          .bindPopup('Tu ubicación actual')
          .openPopup();

        this.map.setView([this.currentLat, this.currentLon], 14);
      },
      (err) => {
        console.error('Error obteniendo ubicación:', err);
      }
    );
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
        lon: this.currentLon
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data?.confirmado) {
      const nuevaUbicacion: Ubicacion = {
        nombre_tienda: data.data.nombre_tienda,
        latitud: data.data.lat,
        longitud: data.data.lon,
        motivo: 'Motivo_Azul', // Por defecto
        fecha_registro: new Date().toISOString()
      };

      this.ubicacionesService.postUbicacion(nuevaUbicacion).subscribe({
        next: () => this.cargarUbicaciones(),
        error: (err) => console.error('Error al registrar ubicación:', err)
      });
    }
  }

  async abrirModalRechazo() {
    const modal = await this.modalController.create({
      component: ModalcolorComponent,
      componentProps: { ubicaciones: this.ubicaciones }
    });

    modal.onDidDismiss().then((res) => {
      if (res.data?.confirmado) {
        this.cambiarColorMarcador(res.data.ubicacion, res.data.motivo);
      }
    });

    await modal.present();
  }

  cambiarColorMarcador(ubicacion: Ubicacion, motivo: string) {
    const iconUrl = this.getIconUrlByMotivo(motivo);

    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker &&
          layer.getLatLng().equals([ubicacion.latitud, ubicacion.longitud])) {
        const newIcon = L.icon({
          iconUrl,
          iconSize: [40, 50],
          iconAnchor: [20, 50]
        });
        layer.setIcon(newIcon);
      }
    });
  }

  abrirRutaEnGoogleMaps() {
    if (!navigator.geolocation) {
      alert('Geolocalización no disponible.');
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const origin = `${pos.coords.latitude},${pos.coords.longitude}`;
      const destinos = [...this.ubicaciones];

      if (destinos.length < 1) {
        alert('No hay ubicaciones para trazar ruta.');
        return;
      }

      const destination = `${destinos[destinos.length - 1].latitud},${destinos[destinos.length - 1].longitud}`;
      const waypoints = destinos.slice(0, -1)
        .map(u => `${u.latitud},${u.longitud}`)
        .join('|');

      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
      window.open(url, '_blank');
    });
  }

  recargarPagina() {
    window.location.reload();
    this.cargarUbicaciones();
  }

  cargarUbicaciones(): void {
    this.ubicacionesService.getUbicacionesConMotivo().subscribe({
      next: (ubicaciones) => {
        console.log('Ubicaciones cargadas:', ubicaciones); // Verifica las ubicaciones y sus motivos
        this.ubicaciones = ubicaciones;
  
        // Limpiar marcadores previos
        this.map.eachLayer((layer) => {
          if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            this.map.removeLayer(layer);
          }
        });
  
        const coordenadas: [number, number][] = [];
  
        ubicaciones.forEach((ubicacion) => {
          console.log('Motivo recibido para marcador:', ubicacion.motivo_final);  // Verifica el motivo_final
          const iconUrl = this.getIconUrlByMotivo(ubicacion.motivo_final); // Asegúrate de usar motivo_final
          const marcador = L.marker([ubicacion.latitud, ubicacion.longitud], {
            icon: L.icon({
              iconUrl,
              iconSize: [40, 50],
              iconAnchor: [20, 50],
            }),
          }).addTo(this.map);
  
          marcador.bindPopup(`
            <strong>${ubicacion.nombre_tienda}</strong><br>
            <strong>${new Date(ubicacion.fecha_registro).toLocaleString()}</strong><br>
            <a href="https://www.google.com/maps?q=${ubicacion.latitud},${ubicacion.longitud}" target="_blank">Ver en Google Maps</a>
          `);
        });
  
        if (coordenadas.length > 1) {
          const ruta = L.polyline(coordenadas, {
            color: 'blue',
            weight: 4,
            opacity: 0.7
          }).addTo(this.map);
          this.map.fitBounds(ruta.getBounds());
        }
      },
      error: (err) => {
        console.error('Error al cargar ubicaciones:', err);
      }
    });
  }
  
  getIconUrlByMotivo(motivo: string): string {
    console.log('Motivo recibido:', motivo);  // Verifica el motivo que se recibe
    switch (motivo) {
      case 'Motivo_Rojo':
        return 'assets/images/red.png';
      case 'Motivo_Naranja':
        return 'assets/images/amarillo.png';
      case 'Motivo_Verde':
        return 'assets/images/verde.png';
      default:
        return 'assets/images/blue.png';  // Azul por defecto
    }
  }
}  