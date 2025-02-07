import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactoService } from 'src/app/services/contacto.service';
import { ModalController, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-check-contactos',
  templateUrl: './check-contactos.page.html',
  styleUrls: ['./check-contactos.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[CommonModule,IonicModule,ReactiveFormsModule,FormsModule]
})
export class CheckContactosPage implements OnInit {
 contactos: any[] = [];

  constructor(
    private contactoService: ContactoService,
    private alertController: AlertController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getContacto
    // Suscribirse al flujo de contactos del servicio
    this.contactoService.contactos$.subscribe(contactosData => {
      this.contactos = contactosData;  // Actualiza los contactos cuando haya un cambio
    });

    // Inicializar la lista de contactos
    this.contactoService.refreshContactos();
  }
  // ✅ Confirmar eliminación de tienda
  async confirmDeleteContacto(id: number) {
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


  getContacto() {
    console.log("📢 Cargando tiendas...");

    this.contactoService.getContactos().subscribe(
      (contactosData) => {
        console.log("✅ contactos obtenidas:", contactosData);
        this.contactos = contactosData;

        this.contactos.forEach((contacto) => {
          if (contacto.id_usuario) {
            this.userService.getUserById(contacto.id_usuario).subscribe(
              (userData) => {
                contacto.nombre_usuario = userData.usuario;
                console.log(`👤 Nombre de usuario asignado: ${userData.usuario}`);
              },
              (error) => {
                console.error(`❌ Error al obtener usuario ${contacto.id_usuario}:`, error);
                contacto.nombre_usuario = 'Desconocido';
              }
            );
          } else {
            contacto.nombre_usuario = 'Desconocido';
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
  
      this.contactoService.deleteContacto(id).subscribe(
        () => {
          console.log("✅ Contacto eliminado correctamente");
          this.getContacto();
        },
        (error) => console.error("❌ Error al eliminar el Contacto :", error)
      );
    }
  }