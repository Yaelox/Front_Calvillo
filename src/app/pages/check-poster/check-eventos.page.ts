import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { PosterService } from 'src/app/services/poster.service';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AgregarPosterComponent } from 'src/app/components/agregar-poster/agregar-poster.component';
import { EditarPosterComponent } from 'src/app/components/editar-poster/editar-poster.component';
@Component({
  selector: 'app-check-eventos',
  templateUrl: './check-eventos.page.html',
  styleUrls: ['./check-eventos.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[CommonModule,IonicModule],
  standalone:true
})
export class CheckEventosPage implements OnInit {
  poster: any[] = [];

  constructor(
    private posterService: PosterService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getPoster();
  }

  // ✅ Confirmar eliminación de tienda
  async confirmDeletePoster(id: number) {
    console.log(`🗑️ Confirmando eliminación del poster con ID: ${id}`);

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar esta tienda?',
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => console.log("❌ Eliminación cancelada") },
        { text: 'Eliminar', cssClass: 'danger', handler: () => this.deletePoster(id) },
      ],
    });

    await alert.present();
  }


  getPoster() {
    this.posterService.getPoster().subscribe({
      next: (res) => {
        this.poster= res;
      },
      error: (err) => {
        console.error('Error al obtener eventos', err);
      }
    });
  }
  
  // ✅ Eliminar tienda
    deletePoster(id: number) {
      console.log(`🗑️ Eliminando tienda con ID: ${id}`);
  
      this.posterService.deletePoster(id).subscribe(
        () => {
          console.log("✅ Tienda eliminada correctamente");
          this.getPoster();
        },
        (error) => console.error("❌ Error al eliminar la tienda:", error)
      );
    }
  
    // ✅ Abrir modal para agregar tienda
    async openAddPosterModal() {
      console.log("➕ Abriendo modal para agregar tienda...");
    
      try {
        const modal = await this.modalController.create({
          component: AgregarPosterComponent,
        });
    
        await modal.present();
    
        // Esperar a que el modal se cierre y recibir los datos
        const { data } = await modal.onDidDismiss();
        console.log("🎯 Modal de agregar tienda cerrado, datos recibidos:", data);
    
        // Si la tienda se ha agregado, recargar la lista de tiendas
        if (data?.posterAgregada) {
          console.log("✅ Nueva tienda agregada.");
          this.getPoster(); // Recargar la lista de tiendas sin recargar la página
        } else {
          console.log("⚠️ Modal de agregar tienda cerrado sin cambios.");
        }
      } catch (error) {
        console.error("❌ Error al abrir el modal de agregar tienda:", error);
      }
    }
    
  
    // ✅ Abrir modal para editar tienda con `onDidDismiss()`
    async openEditPosterModal(poster: any) {
      if (!poster || poster.id_eventos === undefined) {
        console.error("❌ Error: El poster no tiene un ID válido", poster);
        return;
      }
  
      console.log("✏️ Abriendo modal de edición para el poster:", poster);
  
      try {
        const modal = await this.modalController.create({
          component: EditarPosterComponent ,
          componentProps: {
            poster: {
              id_eventos: poster.id_eventos,
              nombre: poster.nombre,
              fecha: poster.fecha,
              ubicacion:poster.ubicacion,
              descripcion: poster.descripcion
            },
          },
        });
  
        await modal.present();
  
        const { data } = await modal.onDidDismiss();
        console.log("🎯 Modal de edición cerrado, datos recibidos:", data);
  
        if (data && data.id_eventos) {
          console.log("📌 Actualizando tienda:", data);
  
          this.posterService.updatePoster(data.id_eventos, {
            nombre: data.nombre,
            fecha: data.fecha,
            ubicacion:data.ubicacion,
            descripcion: data.descripcion

          }).subscribe(() => {
            console.log("✅ Tienda actualizada correctamente.");
            this.getPoster();
          });
        } else {
          console.log("⚠️ Modal de edición cerrado sin cambios.");
        }
      } catch (error) {
        console.error("❌ Error al abrir el modal de edición:", error);
      }
    }
  }