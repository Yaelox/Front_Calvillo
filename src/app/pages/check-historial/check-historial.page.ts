import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ChecadorService } from 'src/app/services/checador.service';
import * as L from 'leaflet';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-check-historial',
  templateUrl: './check-historial.page.html',
  styleUrls: ['./check-historial.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone:true
})
export class CheckHistorialPage implements OnInit {
  historial: any[] = [];
  historialFiltrado: any[] = [];
  map: any;
  colorUsuarios: { [key: number]: string } = {};
  usuarios: { [key: number]: string } = {};
  marcadores: any[] = [];

  constructor(private checadorService: ChecadorService, private userService: UserService) {}

  ngOnInit() {
    console.log("ngOnInit: Iniciando la carga de usuarios.");
    this.obtenerUsuarios();
  }
  
  obtenerUsuarios() {
    this.userService.getUsers().subscribe(
      (usuarios) => {
        this.usuarios = usuarios.reduce((acc, usuario) => {
          if (usuario.id_usuario && !isNaN(usuario.id_usuario)) {
            acc[usuario.id_usuario] = usuario.nombre;
          }
          return acc;
        }, {} as { [key: number]: string });
  
        this.obtenerHistorial();  // Llamar a la función que obtiene los registros
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  
  obtenerHistorial() {
    this.checadorService.obtenerHistorial().subscribe(
      (data) => {
        this.historial = data.map((registro) => ({
          ...registro,
          fecha: moment(registro.fecha).format("YYYY-MM-DD"),
          hora_entrada: registro.hora_entrada ? moment(registro.hora_entrada, "HH:mm:ss").format("hh:mm:ss A") : null,
          hora_salida: registro.hora_salida ? moment(registro.hora_salida, "HH:mm:ss").format("hh:mm:ss A") : null,
          nombre: this.usuarios[registro.usuario_id] || "Usuario Desconocido",
        }));

        // Filtrar solo los registros correspondientes al día actual
        this.filtrarPorFechaActual();
      },
      (error) => {
        console.error("Error al obtener el historial:", error);
      }
    );
  }

  filtrarPorFechaActual() {
    const fechaActual = moment().startOf('day').format('YYYY-MM-DD');
    console.log("Fecha actual (formateada):", fechaActual);

    // Filtrar el historial solo para los registros de la fecha actual
    this.historialFiltrado = this.historial.filter((registro) => {
      const fechaRegistro = moment(registro.fecha).startOf('day').format('YYYY-MM-DD');
      console.log("Fecha del registro:", fechaRegistro);
      return fechaRegistro === fechaActual;
    });

    console.log("Registros encontrados para la fecha actual:", this.historialFiltrado);

    // Actualizar el mapa con los registros filtrados
    this.limpiarMapa();
    this.cargarMapa();
  }

  limpiarMapa() {
    if (this.map) {
      this.map.eachLayer((layer: any) => {
        if (!!layer.toGeoJSON) {
          this.map.removeLayer(layer);
        }
      });
    }
    this.marcadores = [];
  }

  eliminarRegistro(registroId: number) {
    console.log("eliminarRegistro: Eliminando registro con id:", registroId);

    this.historial = this.historial.filter((registro) => registro.id !== registroId);
    this.historialFiltrado = this.historialFiltrado.filter((registro) => registro.id !== registroId);

    // Buscar y eliminar el marcador correcto
    const index = this.marcadores.findIndex((m) => m.id === registroId);
    if (index !== -1) {
      this.map.removeLayer(this.marcadores[index].marker);
      this.marcadores.splice(index, 1);
      console.log("Marcador eliminado correctamente.");
    } else {
      console.warn("No se encontró el marcador para eliminar.");
    }

    this.checadorService.eliminarRegistro(registroId).subscribe(
      (response) => {
        console.log('Registro eliminado con éxito:', response);
      },
      (error) => {
        console.error('Error al eliminar el registro:', error);
      }
    );
  }
  
  cargarMapa() {
    if (!this.map) {
      this.map = L.map('map').setView([21.8853, -102.2916], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);
    }

    this.historialFiltrado.forEach((registro) => {
      const color = this.obtenerColorUsuario(registro.usuario_id);
      this.agregarMarcador(registro, color);
    });
  }

  agregarMarcador(registro: any, color: string) {
    const lat = parseFloat(registro.latitud);
    const lng = parseFloat(registro.longitud);
    const nombreUsuario = this.usuarios[registro.usuario_id] || 'Usuario no encontrado';

    console.log(`agregarMarcador: Agregando marcador para ${nombreUsuario} en ${lat}, ${lng}`);

    if (!isNaN(lat) && !isNaN(lng)) {
      const marcador = L.circleMarker([lat, lng], {
        color: color,
        radius: 8,
        fillOpacity: 1,
      }).addTo(this.map);

      marcador.bindPopup(
        `<strong>Usuario:</strong> ${nombreUsuario} <br>
         <strong>Entrada:</strong> ${registro.hora_entrada} <br>
         <strong>Salida:</strong> ${registro.hora_salida} <br>
         <strong>Fecha:</strong> ${registro.fecha} <br>
         <strong>Ubicación:</strong> ${lat}, ${lng}`
      );

      // Guardamos el marcador junto con el ID del registro
      this.marcadores.push({ id: registro.id, marker: marcador });
    } else {
      console.warn('Latitud o longitud no válida para el marcador:', registro);
    }
  }

  obtenerColorUsuario(usuario_id: number): string {
    if (!this.colorUsuarios[usuario_id]) {
      this.colorUsuarios[usuario_id] = this.generarColorAleatorio();
    }
    return this.colorUsuarios[usuario_id];
  }

  generarColorAleatorio(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
