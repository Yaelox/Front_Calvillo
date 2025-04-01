import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactoService } from 'src/app/services/contacto.service';
import {AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-check-contactos',
  templateUrl: './check-contactos.page.html',
  styleUrls: ['./check-contactos.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone:true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule]
})
export class CheckContactosPage implements OnInit {
  contactos: any[] = [];

  constructor(
    private contactoService: ContactoService,
    private alertController: AlertController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getContacto();
    // Suscribirse al flujo de contactos del servicio
    this.contactoService.contactos$.subscribe(contactosData => {
      console.log("📢 Suscripción activa - Contactos actualizados:", contactosData);
      this.contactos = contactosData;
    });

    // Inicializar la lista de contactos
    this.contactoService.refreshContactos();
  }

  // ✅ Confirmar eliminación de contacto
  async confirmDeleteContacto(id: number) {
    console.log(`🗑️ Confirmando eliminación del contacto con ID: ${id}`);

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar este contacto?',
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => console.log("❌ Eliminación cancelada") },
        { text: 'Eliminar', cssClass: 'danger', handler: () => this.deleteContacto(id) },
      ],
    });

    await alert.present();
  }

  getContacto() {
    console.log("📢 Cargando contactos...");

    this.contactoService.getContactos().subscribe(
      (contactosData) => {
        console.log("✅ Contactos obtenidos:", contactosData);
        this.contactos = contactosData;

        this.contactos.forEach((contacto, index) => {
          console.log(`🔹 Contacto ${index}:`, contacto);
        });

        // Lista de peticiones para obtener usuarios
        const userRequests = this.contactos.map((contacto, index) => {
          console.log(`🔎 Buscando usuario para contacto ${index} con ID de usuario: ${contacto.id_usuario}`);
          return contacto.id_usuario ? this.userService.getUserById(contacto.id_usuario) : null;
        }).filter(req => req !== null); // Filtramos los null

        if (userRequests.length === 0) {
          console.log("⚠️ No hay usuarios que cargar.");
          return;
        }

        forkJoin(userRequests).subscribe(
          (usersData) => {
            console.log("👤 Usuarios obtenidos:", usersData);
            this.contactos.forEach((contacto, index) => {
              const user = usersData[index];
              contacto.nombre_usuario = user ? user.nombre : 'Desconocido';
              console.log(`✅ Asignado usuario: ${contacto.nombre_usuario} al contacto ${index}`);
            });
          },
          (error) => {
            console.error("❌ Error al obtener usuarios:", error);
          }
        );
      },
      (error) => {
        console.error("❌ Error al obtener los contactos:", error);
      }
    );
  }

  // ✅ Eliminar contacto
  deleteContacto(id: number) {
    console.log(`🗑️ Eliminando contacto con ID: ${id}`);

    this.contactoService.deleteContacto(id).subscribe(
      () => {
        console.log("✅ Contacto eliminado correctamente");
        this.getContacto();
      },
      (error) => console.error("❌ Error al eliminar el contacto:", error)
    );
  }
}
