import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ChecadorService } from 'src/app/services/checador.service';
import * as L from 'leaflet';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service'; // Importa el servicio de usuario

@Component({
  selector: 'app-check-historial',
  templateUrl: './check-historial.page.html',
  styleUrls: ['./check-historial.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckHistorialPage implements OnInit {
  historial: any[] = [];
  historialFiltrado: any[] = [];
  fechaSeleccionada: string = new Date().toISOString().split('T')[0];
  map: any;
  colorUsuarios: { [key: number]: string } = {};  // Aseguramos que sea de tipo { [key: number]: string }
  usuarios: { [key: number]: string } = {};  // Aseguramos que sea de tipo { [key: number]: string }

  constructor(private checadorService: ChecadorService, private userService: UserService) {}

  ngOnInit() {
    this.obtenerUsuarios(); // Cargar usuarios al iniciar
    this.obtenerHistorial(); // Obtener el historial después de cargar los usuarios
  }

  obtenerHistorial() {
    this.checadorService.obtenerHistorial().subscribe(
      (data) => {
        console.log('Historial obtenido:', data);
        this.historial = data.map((registro) => {
          // Verifica que el usuario_id esté presente
          const usuarioId = registro.usuario_id;
          const nombreUsuario = usuarioId !== undefined && this.usuarios[usuarioId]
            ? this.usuarios[usuarioId] 
            : 'Usuario Desconocido';

          return {
            ...registro,
            hora_entrada: registro.hora_entrada
              ? moment(registro.hora_entrada, 'HH:mm:ss').format('hh:mm:ss A')
              : null,
            hora_salida: registro.hora_salida
              ? moment(registro.hora_salida, 'HH:mm:ss').format('hh:mm:ss A')
              : null,
            nombre: nombreUsuario, // Asigna el nombre de usuario dinámicamente
          };
        });
        this.filtrarPorFecha();
      },
      (error) => {
        console.error('Error al obtener el historial:', error);
      }
    );
  }

  obtenerUsuarios() {
    this.userService.getUsers().subscribe(
      (usuarios) => {
        // Mapea los usuarios para asociarlos con su id, asegurando que id_usuario sea un número válido
        this.usuarios = usuarios.reduce((acc, usuario) => {
          if (usuario.id_usuario && !isNaN(usuario.id_usuario)) {
            acc[usuario.id_usuario] = usuario.nombre; // Solo se agrega si id_usuario es válido
          }
          return acc;
        }, {} as { [key: number]: string });  // Aseguramos el tipo de `acc`
        console.log('Usuarios cargados:', this.usuarios); // Verifica que los usuarios estén cargados
        this.obtenerHistorial(); // Llama a obtener el historial después de cargar los usuarios
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  filtrarPorFecha() {
    this.historialFiltrado = this.historial.filter((registro) => {
      const fechaRegistro = new Date(registro.fecha).toISOString().split('T')[0];
      return fechaRegistro === this.fechaSeleccionada;
    });
    this.cargarMapa();
  }

  cargarMapa() {
  if (this.map) {
    this.map.remove(); // Elimina el mapa anterior si existe
  }

  if (!this.historialFiltrado.length) return; // No hay datos, no se muestra el mapa

  // Establece las coordenadas iniciales en Aguascalientes
  const latitudInicial = 21.8853;
  const longitudInicial = -102.2916;

  this.map = L.map('map').setView([latitudInicial, longitudInicial], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(this.map);

  this.historialFiltrado.forEach((registro) => {
    const color = this.obtenerColorUsuario(registro.usuario_id);
    this.agregarMarcador(registro, color);
  });
}

  agregarMarcador(registro: any, color: string) {
    const lat = parseFloat(registro.latitud);
    const lng = parseFloat(registro.longitud);

    const nombreUsuario = this.usuarios[registro.usuario_id] || 'Usuario no encontrado';

    if (!isNaN(lat) && !isNaN(lng)) {
      const marcador = L.circleMarker([lat, lng], {
        color: color,
        radius: 8,
        fillOpacity: 1,
      }).addTo(this.map);

      marcador.bindPopup(`
        <strong>Usuario:</strong> ${nombreUsuario} <br>
        <strong>Entrada:</strong> ${registro.hora_entrada} <br>
        <strong>Salida:</strong> ${registro.hora_salida} <br>
        <strong>Ubicación:</strong> ${lat}, ${lng}
      `);
    } else {
      console.warn('Latitud o longitud no válida para el marcador:', registro);
    }
  }

  eliminarRegistro(registroId: number) {
    // Filtrar el historial eliminando el registro con el id correspondiente
    this.historial = this.historial.filter((registro) => registro.id !== registroId);
    this.historialFiltrado = this.historialFiltrado.filter((registro) => registro.id !== registroId);
  
    // Si quieres eliminar el registro del servidor, llama a un método en el servicio que se encargue de ello
    this.checadorService.eliminarRegistro(registroId).subscribe(
      (response) => {
        console.log('Registro eliminado con éxito:', response);
      },
      (error) => {
        console.error('Error al eliminar el registro:', error);
      }
    );
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
