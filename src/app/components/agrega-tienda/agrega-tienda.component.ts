import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UserService, User } from 'src/app/services/user.service';
import { TiendaService, Tienda } from 'src/app/services/tienda.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-agrega-tienda',
  templateUrl: './agrega-tienda.component.html',
  styleUrls: ['./agrega-tienda.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AgregaTiendaComponent implements OnInit {
  tiendaForm!: FormGroup;
  usuarios: User[] = [];

  constructor(
    private fb: FormBuilder,
    private tiendaService: TiendaService,
    private userService: UserService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.tiendaForm = this.fb.group({
      nombre_tienda: [''],
      usuario: [''],
      direccion: [''],
      telefono: ['', [Validators.pattern(/^\d{10}$/)]], // Validación para un teléfono de 10 dígitos
      email: ['', [Validators.required, Validators.email]], // Validación para el correo electrónico
      id_usuario: [''],
      frecuencia_visitas: [''],
    });
    this.loadUsuarios();
  }

  // Cargar la lista de usuarios
  loadUsuarios(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  // Registrar una tienda
  onSubmit(): void {
    if (this.tiendaForm.valid) {
      const tienda: Tienda = this.tiendaForm.value;
      this.tiendaService.createTienda(tienda).subscribe(
        (response) => {
          console.log('Tienda registrada:', response);
          this.mostrarMensaje('Tienda registrada exitosamente.');
          this.tiendaForm.reset();
          // Cierra el modal indicando que se agregó una tienda
          this.modalController.dismiss({
            tiendaAgregada: true, // Indicar que se agregó una tienda
          });
        },
        (error) => {
          console.error('Error al registrar la tienda:', error);
          this.mostrarMensaje('Error al registrar la tienda.');
        }
      );
    } else {
      this.mostrarMensaje('Por favor, complete todos los campos correctamente.');
    }
  }

  // Mostrar mensajes de éxito o error
  mostrarMensaje(mensaje: string): void {
    alert(mensaje); // O puedes usar un Toast para una mejor experiencia de usuario
  }

  // Cerrar el modal sin datos adicionales
  cerrarModal(): void {
    this.modalController.dismiss({
      tiendaAgregada: false, // Indicar que no se realizó ninguna acción
    });
  }
}
