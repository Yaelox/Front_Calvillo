import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService, User} from 'src/app/services/auth.service';
@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[CommonModule,ReactiveFormsModule,IonicModule,FormsModule]
})
export class AgregarUsuarioComponent  implements OnInit {

  usuarioForm!: FormGroup;
 
   constructor(
     private fb: FormBuilder,
     private modalController: ModalController,
     private authService:AuthService
   ) {}
 
   ngOnInit(): void {
     this.usuarioForm = this.fb.group({
       usuario: [''],
       password: [''],
       email: ['', [Validators.required, Validators.email]], // Validación para el correo electrónico
       tipo_usuario: [''],
     });
   }
 
  
   // Registrar una tienda
   onSubmit(): void {
     if (this.usuarioForm.valid) {
       const usuario: User = this.usuarioForm.value;
       this.authService.registerUser(usuario).subscribe(
         (response) => {
           console.log('Usuario Registrado:', response);
           this.mostrarMensaje('Usuario registrado exitosamente.');
           this.usuarioForm.reset();
           // Cierra el modal indicando que se agregó una tienda
           this.modalController.dismiss({
             usuarioAgregado: true, // Indicar que se agregó una tienda
           });
         },
         (error) => {
           console.error('Error al registrar al usuario:', error);
           this.mostrarMensaje('Error al registrar el usuario.');
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
       usuarioAgregado: false, // Indicar que no se realizó ninguna acción
     });
   }
 }
 