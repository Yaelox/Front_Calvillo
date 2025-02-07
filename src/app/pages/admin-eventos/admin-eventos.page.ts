import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule,ModalController,AlertController } from '@ionic/angular';
import { EventService} from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-eventos',
  templateUrl: './admin-eventos.page.html',
  styleUrls: ['./admin-eventos.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[CommonModule,IonicModule]
})
export class AdminEventosPage implements OnInit {
eventoss: any[] = [];

  constructor(
    private eventService: EventService,
    private modalController: ModalController,
    private alertController: AlertController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getEventos();
  }

  // ✅ Confirmar eliminación de tienda
  async confirmDeleteEvento(id: number) {
    console.log(`🗑️ Confirmando eliminación del poster con ID: ${id}`);

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar esta Contacto?',
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => console.log("❌ Eliminación cancelada") },
        { text: 'Eliminar', cssClass: 'danger', handler: () => this.deleteContacto(id) },
      ],
    });

    await alert.present();
  }


  getEventos() {
    console.log("📢 Cargando tiendas...");

    this.eventService.getEventos().subscribe(
      (eventosData) => {
        console.log("✅ contactos obtenidas:", eventosData);
        this.eventoss = eventosData;

        this.eventoss.forEach((evento) => {
          if (evento.id_usuario) {
            this.userService.getUserById(evento.id_usuario).subscribe(
              (userData) => {
                evento.nombre_usuario = userData.usuario;
                console.log(`👤 Nombre de usuario asignado: ${userData.usuario}`);
              },
              (error) => {
                console.error(`❌ Error al obtener usuario ${evento.id_usuario}:`, error);
                evento.nombre_usuario = 'Desconocido';
              }
            );
          } else {
            evento.nombre_usuario = 'Desconocido';
          }
        });
      },
      (error) => {
        console.error("❌ Error al obtener las tiendas:", error);
      }
    );
  }

  // ✅ Eliminar tienda
    deleteContacto(id: number) {
      console.log(`🗑️ Eliminando Contacto con ID: ${id}`);
  
      this.eventService.deleteEvento(id).subscribe(
        () => {
          console.log("✅ Contacto eliminado correctamente");
          this.getEventos();
        },
        (error) => console.error("❌ Error al eliminar el Contacto :", error)
      );
    }
  }