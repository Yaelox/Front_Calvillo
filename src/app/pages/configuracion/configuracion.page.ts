import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { UserService, User} from 'src/app/services/user.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  imports: [CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfiguracionPage implements OnInit {
  userId: number = 0;
  user: User = {
    nombre: '',
    usuario: '',
    email: '',
    password: '',
    telefono: '',
    tipo_usuario: 'cliente',
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

 
  ngOnInit() {
    // Llamar al servicio para obtener los datos del usuario por ID
    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        this.user = data;  // Asignar los datos recibidos al objeto user
      },
      (error) => {
        console.error('Error al obtener el usuario', error);
      }
    );
  }

  // Método para actualizar el usuario
  updateUser() {
    this.userService.updateUser(this.userId, this.user).subscribe(
      (response) => {
        console.log('Usuario actualizado correctamente', response);
      },
      (error) => {
        console.error('Error al actualizar el usuario', error);
      }
    );
  }
}