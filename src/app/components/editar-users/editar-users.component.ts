import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../services/user.service'; 
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar-users',
  templateUrl: './editar-users.component.html',
  styleUrls: ['./editar-users.component.scss'],
  imports:[IonicModule, ReactiveFormsModule,CommonModule,FormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EditarUsersComponent{
 // Datos del usuario (en un caso real, podrías obtenerlos de un servicio o API)
 @Input() user!: { id_usuario: number; usuario: string; email: string; tipo_usuario: string };

  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private navController: NavController
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  // Actualiza el usuario y cierra la modal si se completa correctamente
  updateUser() {
    if (!this.user || !this.user.id_usuario) {
      console.error("Error: ID del usuario no definido", this.user);
      return;
    }
    const userToUpdate = {
      usuario: this.user.usuario,
      email: this.user.email,
      tipo_usuario: this.user.tipo_usuario
    };
  
    this.userService.updateUser(this.user.id_usuario, userToUpdate).subscribe(
      () => {
        // Asegúrate de que `this.user` contiene los valores actualizados antes de cerrar el modal
        this.modalController.dismiss(this.user); 
      },
      (error) => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }
}