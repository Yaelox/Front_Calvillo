import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RepartidorService, Venta } from 'src/app/services/repartidor.service';
import { RechazoService } from 'src/app/services/rechazo.service';
import { IonicModule, ToastController, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MotivoRechazoModalComponent } from 'src/app/components/motivo-rechazo-modal/motivo-rechazo-modal.component';

@Component({
  selector: 'app-rechazos',
  templateUrl: './rechazos.page.html',
  styleUrls: ['./rechazos.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RechazosPage implements OnInit {
  pedidos: Venta[] = []; // Lista de pedidos
  pedidoSeleccionado: Venta | null = null; // Pedido seleccionado para rechazo
  descripcionRechazo: string = ''; // Descripción del rechazo

  constructor(
    private repartoService: RepartidorService,
    private rechazoService: RechazoService,
    private toastController: ToastController,
    private modalController: ModalController // Inyectamos el ModalController
  ) {}

  ngOnInit() {
    this.cargarPedidos();
  }

  /** Cargar todos los pedidos */
async cargarPedidos() {
  try {
    console.log('Cargando pedidos...');
    const data = await this.repartoService.obtenerTodasLasVentas().toPromise();
    console.log('Datos de pedidos:', data);

    // Filtrar los pedidos para no mostrar los rechazados
    this.pedidos = Array.isArray(data) && data.length > 0 
      ? data.filter(pedido => !pedido.rechazado)  // Solo mostrar los pedidos no rechazados
      : [];
    
    console.log('Pedidos cargados:', this.pedidos);
  } catch (error) {
    console.error('Error al cargar los pedidos:', error);
    this.mostrarToast('Error al cargar los pedidos', 'danger');
  }
}


  /** Abrir el modal para seleccionar el motivo del rechazo */
  async rechazarPedido(pedido: Venta) {
    if (pedido.rechazado) {
      // Si el pedido ya ha sido rechazado, mostramos un mensaje y no hacemos nada
      this.mostrarToast('Este pedido ya ha sido rechazado', 'warning');
      return;
    }

    console.log('Pedido seleccionado:', pedido);
    this.pedidoSeleccionado = pedido; // Establecemos el pedido seleccionado

    const modal = await this.modalController.create({
      component: MotivoRechazoModalComponent, // Modal para seleccionar el motivo del rechazo
    });

    // Cuando el modal se cierra, obtenemos el motivo del rechazo
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.descripcionRechazo = result.data;
        this.confirmarRechazo(); // Llamamos al método para confirmar el rechazo
      }
    });

    return await modal.present(); // Presentamos el modal
  }

  /** Confirmar el rechazo y registrar el rechazo en el sistema */
  async confirmarRechazo() {
    if (!this.descripcionRechazo.trim()) {
      this.mostrarToast('Escribe una razón para el rechazo', 'warning');
      return;
    }

    try {
      const rechazo = {
        id_ventarepartidor: this.pedidoSeleccionado!.id_venta,
        descripcion: this.descripcionRechazo,
      };

      console.log('Datos del rechazo:', rechazo);

      // Enviar el rechazo al backend
      await this.rechazoService.crearRechazoRepartidor(rechazo).toPromise();
      
      // Actualizar el pedido a rechazado
      this.pedidoSeleccionado!.rechazado = true;

      // Filtrar de nuevo la lista para que el pedido rechazado no se muestre
      this.pedidos = this.pedidos.filter(pedido => pedido.id_venta !== this.pedidoSeleccionado!.id_venta);

      this.mostrarToast('Rechazo registrado correctamente', 'success');

      // Reset después de registrar el rechazo
      this.descripcionRechazo = '';
      this.pedidoSeleccionado = null;

      // Recargar los pedidos después de rechazar uno
      this.cargarPedidos();
    } catch (error) {
      console.error('Error al registrar el rechazo:', error);
      this.mostrarToast('Error al registrar el rechazo', 'danger');
    }
  }

  /** Mostrar mensaje Toast */
  async mostrarToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}

