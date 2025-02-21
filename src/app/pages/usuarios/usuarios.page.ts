import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular'; 
import { UserService } from '../../services/user.service'; 
import { CommonModule } from '@angular/common';

import { EditarUsersComponent } from 'src/app/components/editar-users/editar-users.component';
import { AgregarUsuarioComponent } from 'src/app/components/agregar-usuario/agregar-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule]
})
export class UsuariosPage implements OnInit {
  usuarios: any[] = [];

  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    console.log("🔄 ngOnInit ejecutado, llamando a getUsers()");
    this.getUsers();
  }

  getUsers() {
    console.log("📡 Llamando a getUsers()...");
    this.userService.getUsers().subscribe(
      (data) => {
        console.log("✅ Usuarios obtenidos:", data);
        this.usuarios = data;
      },
      (error) => {
        console.error("❌ Error al obtener los usuarios:", error);
      }
    );
  }

  async confirmDeleteUser(id: number) {
    console.log("🗑 Se activó confirmDeleteUser con ID:", id);

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("⛔ Eliminación cancelada");
          }
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            this.deleteUser(id);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteUser(id: number) {
    console.log("🗑 Intentando eliminar el usuario con ID:", id);
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log("✅ Usuario eliminado correctamente");
        this.getUsers();
      },
      (error) => {
        console.error("❌ Error al eliminar el usuario", error);
      }
    );
  }

  async openAddUserModal() {
    console.log("➕ Intentando abrir modal de agregar usuario...");

    const modal = await this.modalController.create({
      component: AgregarUsuarioComponent,
    });

    console.log("📌 Modal creada:", modal);

    await modal.present();
    console.log("✅ Modal presentada correctamente.");

    const { data } = await modal.onDidDismiss();
    console.log("📤 Modal cerrada, datos recibidos:", data);

    if (data && data.usuarioAgregado) {
      console.log("🔄 Recargando usuarios...");
      this.getUsers();
    }
  }

  async openEditModal(usuario: any) {
    console.log("🟢 Intentando abrir modal de edición para usuario:", usuario);

    if (!usuario || usuario.id_usuario === undefined) {
      console.error("❌ Error: Usuario sin ID", usuario);
      return;
    }

    try {
      console.log("🛠 Creando modal...");
      const modal = await this.modalController.create({
        component: EditarUsersComponent,
        componentProps: {
          user: { 
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre, 
            usuario: usuario.usuario,
            email: usuario.email,
            tipo_usuario: usuario.tipo_usuario,
            telefono: usuario.telefono
          }
        }
      });

      console.log("📌 Modal creada con éxito:", modal);

      await modal.present();
      console.log("✅ Modal presentada correctamente.");

      const { data } = await modal.onDidDismiss();
      console.log("📤 Modal cerrada, datos recibidos:", data);

      if (data) {
        console.log("📡 Enviando actualización al backend con:", data);
        this.userService.updateUser(data.id_usuario, data).subscribe(
          (response) => {
            console.log("✅ Usuario actualizado en backend:", response);
            this.getUsers();
          },
          (error) => {
            console.error("❌ Error actualizando usuario:", error);
          }
        );
      }
    } catch (error) {
      console.error("❌ Error al abrir la modal:", error);
    }
  }
}
