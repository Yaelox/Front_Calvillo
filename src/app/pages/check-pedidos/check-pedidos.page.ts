import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ComprasService, Pedido } from 'src/app/services/compras.service';
import { UserService, User } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-check-pedidos',
  templateUrl: './check-pedidos.page.html',
  styleUrls: ['./check-pedidos.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, ReactiveFormsModule, FormsModule, CommonModule],
})
export class CheckPedidosPage implements OnInit {
  compras: Pedido[] = [];
  usuarios: { [id: number]: User } = {};
  modalAbierto = false;
  compraSeleccionada: Pedido = {} as Pedido;
  estadoSeleccionado = '';
  noProductos: number = 0;

  // Variables para manejar los estados de los pedidos
  pedidosPendientes: Pedido[] = [];
  pedidosEn_proceso: Pedido[] = [];
  pedidosCompletados: Pedido[] = [];

  // Coordenadas de Calvillo
  private calvilloCoords: [number, number] = [21.854023, -102.721191];

  constructor(
    private comprasService: ComprasService,
    private userService: UserService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.comprasService.getPedidosConDetalles().subscribe({
      next: (data) => {
        this.compras = data;

        // Filtrar los pedidos por estado
        this.pedidosPendientes = this.compras.filter(compra => compra.estado === 'pendiente');
        this.pedidosEn_proceso = this.compras.filter(compra => compra.estado === 'en_proceso');
        this.pedidosCompletados = this.compras.filter(compra => compra.estado === 'completada');

        // Obtener todos los usuarios en paralelo
        const userRequests = this.compras.map(compra =>
          this.userService.getUserById(compra.usuario_id)
        );

        forkJoin(userRequests).subscribe({
          next: (usuarios) => {
            usuarios.forEach((usuario, index) => {
              this.usuarios[this.compras[index].usuario_id] = usuario;
            });
          },
          error: (err) => {
            console.error('Error al obtener usuarios:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener los pedidos', err);
      }
    });
  }

  abrirModal(compra: Pedido) {
    this.compraSeleccionada = compra;
    this.estadoSeleccionado = compra.estado;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  actualizarEstado() {
    this.compraSeleccionada.estado = this.estadoSeleccionado;

    this.comprasService.actualizarEstadoCompra(this.compraSeleccionada.id_compra, this.estadoSeleccionado).subscribe({
      next: () => {
        console.log('Estado actualizado con éxito');
        this.cerrarModal();
        this.cargarPedidos(); // Recargar los pedidos para reflejar el cambio
      },
      error: (err) => {
        console.error('Error al actualizar estado', err);
      }
    });
  }

  // Generar enlace a Google Maps con latitud y longitud
  generarGoogleMapsUrl(latitud?: number, longitud?: number): string {
    if (!latitud || !longitud) return '';
    return `https://www.google.com/maps?q=${latitud},${longitud}`;
  }

  // Método para generar la ruta desde Calvillo hasta el pedido
  generarRutaGoogleMaps(lat: number, lon: number): string {
    const [latitud, longitud] = this.calvilloCoords;
    return `https://www.google.com/maps/dir/${latitud},${longitud}/${lat},${lon}`;
  }
}
