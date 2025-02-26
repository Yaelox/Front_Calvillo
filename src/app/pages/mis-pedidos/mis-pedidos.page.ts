import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { ComprasService,Pedido} from 'src/app/services/compras.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.page.html',
  styleUrls: ['./mis-pedidos.page.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MisPedidosPage implements OnInit {

  compras: Pedido[] = []; // Definir propiedad
  pedidosPendientes: Pedido[] = []; // Definir propiedad
  pedidosEn_proceso: Pedido[] = []; // Definir propiedad
  pedidosCompletados: Pedido[] = []; // Definir propiedad

  constructor(
    private comprasService: ComprasService,
    private userService: UserService,
    private alertController:AlertController 
  ) {}

  ngOnInit() {
    const userId = this.userService.getUserIdFromLocalStorage();
    console.log('Usuario logueado ID:', userId);
    if (!userId) {
      console.error('No hay usuario logueado en localStorage.');
      return;
    }
    this.cargarPedidos();
  }

  getCardClass(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'pedido-pendiente';
      case 'en_proceso':
        return 'pedido-en-proceso';
      case 'completada':
        return 'pedido-completado';
      case 'cancelado':
        return 'pedido-cancelado';
      default:
        return '';
    }
  }
  
  cargarPedidos() {
    const userId = this.userService.getUserIdFromLocalStorage();
    if (!userId) {
      console.error('No se encontró un usuario logueado en localStorage');
      return;
    }
  
    this.comprasService.getPedidosConDetalles().subscribe({
      next: (data: any[]) => {
        console.log('Todos los pedidos obtenidos:', data);
  
        this.compras = data.filter(pedido => {
          console.log(`Comparando pedido usuario_id: ${pedido.usuario_id} con logueado: ${userId}`);
          return pedido.usuario_id === userId;
        });
  
        console.log('Pedidos del usuario logueado:', this.compras);
  
        this.pedidosPendientes = this.compras.filter(p => p.estado === 'pendiente');
        this.pedidosEn_proceso = this.compras.filter(p => p.estado === 'en_proceso');
        this.pedidosCompletados = this.compras.filter(p => p.estado === 'completada');
      },
      error: (err) => {
        console.error('Error al obtener los pedidos:', err);
      }
    });
  }
  

  async cancelarPedido(pedidoId: number) {
    const alert = await this.alertController.create({
      header: 'Cancelar Pedido',
      message: '¿Estás seguro de que quieres cancelar este pedido?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí, cancelar',
          handler: () => {
            this.comprasService.eliminarCompra(pedidoId).subscribe({
              next: () => {
                this.cargarPedidos(); // Recargar pedidos después de cancelar
              },
              error: (err) => {
                console.error('Error al cancelar el pedido:', err);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}