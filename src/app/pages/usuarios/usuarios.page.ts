import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular'; 
import { UserService } from '../../services/user.service'; 
import { CommonModule } from '@angular/common';
import { MenuController } from '@ionic/angular';
import { EditarUsersComponent } from 'src/app/components/editar-users/editar-users.component';
import { AgregarUsuarioComponent } from 'src/app/components/agregar-usuario/agregar-usuario.component';
import { HeaderConfigComponent } from '../../components/header-config/header-config.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule] // Agregamos IonicModule
})
export class UsuariosPage implements OnInit {
  usuarios: any[] = [];

  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private alertController: AlertController,
    private menuCtrl: MenuController// Asegurar que está bien inyectado
  ) {}

  ngOnInit() {
    this.getUsers();
    this.menuCtrl.enable(true);
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }

  async confirmDeleteUser(id: number) {
    console.log('Se activó confirmDeleteUser con ID:', id); // 🔍 Verifica si la función se está ejecutando

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
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
    console.log('Intentando eliminar el usuario con ID:', id);
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('Usuario eliminado correctamente');
        this.getUsers();
      },
      (error) => {
        console.error('Error al eliminar el usuario', error);
      }
    );
  }

  async openAddUserModal() {
    const modal = await this.modalController.create({
      component: AgregarUsuarioComponent,
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    
    if (data && data.usuarioAgregado) {
      window.location.reload();
    }
  }

  async openEditModal(usuario: any) {
    if (!usuario || usuario.id_usuario === undefined) {
      console.error("Error: Usuario sin ID", usuario);
      return;
    }

    const modal = await this.modalController.create({
      component: EditarUsersComponent,
      componentProps: {
        user: { 
          id_usuario: usuario.id_usuario,
          usuario: usuario.usuario,
          email: usuario.email,
          tipo_usuario: usuario.tipo_usuario
        }
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        const { id_usuario, usuario, email, tipo_usuario } = data.data;
        this.userService.updateUser(id_usuario, { usuario, email, tipo_usuario }).subscribe(() => {
          this.getUsers();
        });
      }
    });

    return await modal.present();
  }
}
