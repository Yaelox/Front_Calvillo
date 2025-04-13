import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/services/user.service';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone:true
})
export class ConfiguracionPage implements OnInit {
  user: User = {
    id_usuario: 0,
    nombre: '',
    usuario: '',
    email: '',
    password: '',
    telefono: '',
    tipo_usuario: '',
    fecha_registro: ''
  };

  recargarPagina() {
    window.location.reload();
  }
  isEditing: boolean = false;
  isLoading: boolean = false;
  updateSuccess: boolean = false;
  updateError: boolean = false;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Recupera el id_usuario de localStorage
    const userId = localStorage.getItem('id_usuario');
    console.log('Valor de userId obtenido de localStorage:', userId);

    if (userId) {
      console.log('ID de usuario recuperado de localStorage:', userId);

      // Llama al servicio con el id_usuario recuperado
      this.userService.getUserById(Number(userId)).subscribe(
        data => {
          console.log('Datos del usuario recibidos del backend:', data);
          
          // Asegurar que user recibe los datos correctamente
          this.user = { ...data };

          // Forzar detección de cambios
          this.cdr.detectChanges();
        },
        error => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el ID de usuario en localStorage.');
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  async updateUser() {
    const userId = this.user.id_usuario;
    if (userId !== undefined && userId !== null) {
      if (this.isEditing) {
        this.isLoading = true;
        this.userService.updateUser(userId, this.user).subscribe(
          async response => {
            console.log('Usuario actualizado con éxito:', response);
            this.isLoading = false;
            this.updateSuccess = true;
            this.isEditing = false;

            // Mostrar mensaje de éxito usando Ionic Alert
            const alert = await this.alertController.create({
              header: '¡Cuenta actualizada!',
              message: 'Tu cuenta ha sido actualizada correctamente.',
              buttons: ['Aceptar']
            });
            await alert.present();
          },
          async error => {
            console.error('Error al actualizar usuario:', error);
            this.isLoading = false;
            this.updateError = true;

            // Mostrar mensaje de error usando Ionic Alert
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'Hubo un error al actualizar tu cuenta. Inténtalo de nuevo.',
              buttons: ['Aceptar']
            });
            await alert.present();
          }
        );
      }
    } else {
      console.error('ID de usuario inválido');
    }
  }

  async deleteUser() {
    const userId = this.user.id_usuario;
    if (userId !== undefined && userId !== null) {
      const alert = await this.alertController.create({
        header: '¿Estás seguro?',
        message: '¡Tu cuenta será eliminada permanentemente!',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Eliminación cancelada');
            }
          },
          {
            text: 'Sí, eliminar',
            handler: () => {
              this.userService.deleteUser(userId).subscribe(
                async response => {
                  console.log('Usuario eliminado', response);
                  localStorage.removeItem('id_usuario'); // Eliminar usuario del localStorage
                  this.user = { id_usuario: 0, nombre: '', usuario: '', email: '', password: '', telefono: '', tipo_usuario: '', fecha_registro: '' };

                  // Mostrar mensaje de éxito y redirigir al login
                  const successAlert = await this.alertController.create({
                    header: '¡Cuenta eliminada!',
                    message: 'Has eliminado tu cuenta exitosamente.',
                    buttons: [
                      {
                        text: 'Aceptar',
                        handler: () => {
                          this.router.navigate(['/login']); // Redirigir al login
                        }
                      }
                    ]
                  });
                  await successAlert.present();
                },
                async error => {
                  console.error('Error al eliminar usuario:', error);
                  const errorAlert = await this.alertController.create({
                    header: 'Error',
                    message: 'Hubo un error al eliminar tu cuenta. Inténtalo de nuevo.',
                    buttons: ['Aceptar']
                  });
                  await errorAlert.present();
                }
              );
            }
          }
        ]
      });

      await alert.present();
    } else {
      console.error('ID de usuario inválido');
    }
  }
}
