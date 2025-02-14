import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda.service';
import { ModalController, AlertController } from '@ionic/angular';
import { AgregaTiendaComponent } from 'src/app/components/agrega-tienda/agrega-tienda.component';
import { EditarTiendaComponent } from 'src/app/components/editar-tienda/editar-tienda.component';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.page.html',
  styleUrls: ['./tiendas.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
})
export class TiendasPage implements OnInit {
  tiendas: any[] = [];

  constructor(
    private tiendaService: TiendaService,
    private modalController: ModalController,
    private alertController: AlertController,
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log("🔄 Iniciando componente TiendasPage...");
    this.getTiendas();
  }

  // ✅ Obtener tienda
getTiendas() {
  console.log("📢 Cargando tiendas...");

  this.tiendaService.getTiendas().subscribe(
    (tiendasData) => {
      console.log("✅ Tiendas obtenidas:", tiendasData);
      this.tiendas = tiendasData;

      this.tiendas.forEach((tienda, index) => {
        console.log(`🔹 Tienda ${index}:`, tienda);
      });

      // Lista de peticiones para obtener usuarios
      const userRequests = this.tiendas.map((tienda, index) => {
        console.log(`🔎 Buscando usuario para tienda ${index} con ID de usuario: ${tienda.id_usuario}`);
        return tienda.id_usuario ? this.userService.getUserById(tienda.id_usuario) : null;
      }).filter(req => req !== null); // Filtramos los null

      console.log("🔄 Lista de peticiones de usuarios:", userRequests); // Ver las peticiones de usuarios generadas

      if (userRequests.length === 0) {
        console.log("⚠️ No hay usuarios que cargar.");
        return;
      }

      // Realizamos las peticiones de usuarios en paralelo
      forkJoin(userRequests).subscribe(
        (usersData) => {
          console.log("👤 Usuarios obtenidos:", usersData);

          // Asignar el nombre del usuario a cada tienda
          this.tiendas.forEach((tienda, index) => {
            const user = usersData[index];
            tienda.nombre = user ? user.nombre : 'Desconocido'; // Asignamos el nombre del usuario
            console.log(`✅ Asignado usuario: ${tienda.nombre} a la tienda ${index}`);
          });
        },
        (error) => {
          console.error("❌ Error al obtener usuarios:", error);
        }
      );
    },
    (error) => {
      console.error("❌ Error al obtener las tiendas:", error);
    }
  );
}

  
  
  // ✅ Confirmar eliminación de tienda
  async confirmDeleteTienda(id: number) {
    console.log(`🗑️ Confirmando eliminación de la tienda con ID: ${id}`);

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar esta tienda?',
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => console.log("❌ Eliminación cancelada") },
        { text: 'Eliminar', cssClass: 'danger', handler: () => this.deleteTienda(id) },
      ],
    });

    await alert.present();
  }

  // ✅ Eliminar tienda
  deleteTienda(id: number) {
    console.log(`🗑️ Eliminando tienda con ID: ${id}`);

    this.tiendaService.deleteTienda(id).subscribe(
      () => {
        console.log("✅ Tienda eliminada correctamente");
        this.getTiendas();
      },
      (error) => console.error("❌ Error al eliminar la tienda:", error)
    );
  }

  // ✅ Abrir modal para agregar tienda
  async openAddTiendaModal() {
    console.log("➕ Abriendo modal para agregar tienda...");
  
    try {
      const modal = await this.modalController.create({
        component: AgregaTiendaComponent,
      });
  
      await modal.present();
  
      // Esperar a que el modal se cierre y recibir los datos
      const { data } = await modal.onDidDismiss();
      console.log("🎯 Modal de agregar tienda cerrado, datos recibidos:", data);
  
      // Si la tienda se ha agregado, recargar la lista de tiendas
      if (data?.tiendaAgregada) {
        console.log("✅ Nueva tienda agregada.");
        this.getTiendas(); // Recargar la lista de tiendas sin recargar la página
      } else {
        console.log("⚠️ Modal de agregar tienda cerrado sin cambios.");
      }
    } catch (error) {
      console.error("❌ Error al abrir el modal de agregar tienda:", error);
    }
  }
  

  // ✅ Abrir modal para editar tienda con `onDidDismiss()`
  async openEditTiendaModal(tienda: any, usuarioNombre: string) {
    if (!tienda || tienda.id_tienda === undefined) {
      console.error("❌ Error: La tienda no tiene un ID válido", tienda);
      return;
    }

    console.log("✏️ Abriendo modal de edición para la tienda:", tienda);

    try {
      const modal = await this.modalController.create({
        component: EditarTiendaComponent,
        componentProps: {
          tienda: {
            id_tienda: tienda.id_tienda,
            nombre_tienda: tienda.nombre_tienda,
            direccion: tienda.direccion,
            telefono: tienda.telefono,
            email: tienda.email,
            id_usuario: tienda.id_usuario,
            frecuencia_visitas: tienda.frecuencia_visitas,
          },
        },
      });

      await modal.present();

      const { data } = await modal.onDidDismiss();
      console.log("🎯 Modal de edición cerrado, datos recibidos:", data);

      if (data && data.id_tienda) {
        console.log("📌 Actualizando tienda:", data);

        this.tiendaService.updateTienda(data.id_tienda, {
          nombre_tienda: data.nombre_tienda,
          direccion: data.direccion,
          telefono: data.telefono,
          email: data.email,
          id_usuario: data.id_usuario,
          frecuencia_visitas: data.frecuencia_visitas,
        }).subscribe(() => {
          console.log("✅ Tienda actualizada correctamente.");
          this.getTiendas();
        });
      } else {
        console.log("⚠️ Modal de edición cerrado sin cambios.");
      }
    } catch (error) {
      console.error("❌ Error al abrir el modal de edición:", error);
    }
  }
}
