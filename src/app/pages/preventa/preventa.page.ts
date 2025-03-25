import { Component,AfterViewInit,OnInit} from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { AgregaTiendaComponent } from "../../components/agrega-tienda/agrega-tienda.component";
import { ModalController } from '@ionic/angular';
import { TiendaService, Tienda} from 'src/app/services/tienda.service';
import { UserService } from 'src/app/services/user.service';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-preventa',
  templateUrl: './preventa.page.html',
  styleUrls: ['./preventa.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [HeaderComponent,
    FooterComponent,
    CommonModule],
})
export class PreventaPage   implements OnInit {
  tiendas: Tienda[] = [];
  private map: L.Map | undefined;

   // Coordenadas de Aguascalientes Centro
   private aguascalientesCoords: [number, number] = [21.8818, -102.291];

   // Coordenadas de Calvillo (Matriz)
   private calvilloCoords: [number, number] = [21.854023, -102.721191];

  constructor(
    private modalController : ModalController,
    private tiendaService: TiendaService,
    private userService: UserService
  ) {}

  private icono = {
    alta: L.icon({
      iconUrl: 'assets/images/verde.png',
      iconSize: [40, 50],
      iconAnchor: [20, 50],
      popupAnchor: [1, -40]
    }),
    media: L.icon({
      iconUrl: 'assets/images/amarillo.png',
      iconSize: [40, 50],
      iconAnchor: [20, 50],
      popupAnchor: [1, -40]
    }),
    baja: L.icon({
      iconUrl: 'assets/images/rojo.png',
      iconSize: [40, 50],
      iconAnchor: [20, 50],
      popupAnchor: [1, -40]
    }),
  };

  ngOnInit(): void {
    this.cargarTiendas();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  cargarTiendas(): void {
    this.tiendaService.getTiendas().subscribe(
      (tiendas) => {
        this.tiendas = tiendas;
        this.tiendas.forEach((tienda) => this.agregarMarcadorPorDireccion(tienda));
      },
      (error) => {
        console.error('Error al cargar las tiendas:', error);
      }
    );
  }

  agregarMarcador(lat: number, lon: number, tienda: Tienda): void {
    if (this.map) {
      this.userService.getUserById(tienda.id_usuario).subscribe(
        (usuario) => {
          // URL para abrir Google Maps con la matriz en Calvillo como punto de inicio
          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${this.calvilloCoords[0]},${this.calvilloCoords[1]}&destination=${lat},${lon}`;
  
          const popupContent = `
            <strong>${tienda.nombre_tienda}</strong><br>
            Dirección: ${tienda.direccion || 'No disponible'}<br>
            Teléfono: ${tienda.telefono || 'No disponible'}<br>
            Email: ${tienda.email || 'No disponible'}<br>
            Propietario: ${usuario.nombre || 'No disponible'}<br>
            Frecuencia de visitas: ${tienda.frecuencia_visitas || 'No especificada'}<br>
            <a href="${googleMapsUrl}" target="_blank" style="color: blue; text-decoration: underline;">
              📍 Ir con Google Maps
            </a>
          `;
  
          let icono;
          switch (tienda.frecuencia_visitas?.toLowerCase()) {
            case "muy_recurrente":
              icono = this.icono.alta; // Verde
              break;
            case "poco_recurrente":
              icono = this.icono.media; // Amarillo
              break;
            case "nada_recurrente":
              icono = this.icono.baja; // Rojo
              break;
            default:
              return;
          }
  
          L.marker([lat, lon], { icon: icono })
            .addTo(this.map!)
            .bindPopup(popupContent);
        },
        (error) => {
          console.error('Error al obtener el propietario:', error);
        }
      );
    }
  }  
  
  agregarMarcadorPorDireccion(tienda: Tienda): void {
    if (tienda.direccion) {
      this.geocodificarDireccion(tienda.direccion).then((coords) => {
        if (coords) {
          this.agregarMarcador(coords.lat, coords.lon, tienda);
        }
      });
    }
  }

  async geocodificarDireccion(direccion: string): Promise<{ lat: number; lon: number } | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      }
      return null;
    } catch (error) {
      console.error('Error al geocodificar la dirección:', error);
      return null;
    }
  } 
  private initMap(): void {
    // Inicializar el mapa
    this.map = L.map('map', { zoomControl: true }).setView(this.aguascalientesCoords, 12);

    // Cargar el mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Agregar el marcador dorado en Calvillo
    L.marker(this.calvilloCoords)
      .addTo(this.map)
      .bindPopup('<b>Matriz</b><br>Mi Crush de Calvillo');

    // Recalcular el tamaño del mapa después de cargar
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 100);
  }

   // Función para resetear el mapa a las coordenadas iniciales
   resetMap(): void {
    if (this.map) {
      this.map.setView(this.aguascalientesCoords, 12); // Regresar a Aguascalientes Centro
    }
  }

  async openAddStoreModal() {
    const modal = await this.modalController.create({
      component: AgregaTiendaComponent,
    });
  
    await modal.present();
  
    // Escuchar el evento cuando el modal se cierra
    const { data } = await modal.onDidDismiss();
    
    if (data && data.tiendaAgregada) {
      // Si una tienda fue agregada, recargar toda la página
      window.location.reload();
    }
  }
}