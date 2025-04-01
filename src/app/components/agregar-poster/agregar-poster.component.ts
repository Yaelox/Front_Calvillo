import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PosterService,Poster } from 'src/app/services/poster.service';

@Component({
  selector: 'app-agregar-poster',
  templateUrl: './agregar-poster.component.html',
  styleUrls: ['./agregar-poster.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone:true
})
export class AgregarPosterComponent  implements OnInit {
posterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private posterService: PosterService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.posterForm = this.fb.group({
      nombre: ['',[Validators.required]],
      fecha: ['',[Validators.required]],
      ubicacion: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],

    });
  }



  // Registrar una tienda
  onSubmit(): void {
    if (this.posterForm.valid) {
      const poster: Poster = this.posterForm.value;
      this.posterService.createPoster(poster).subscribe(
        (response) => {
          console.log('Poster registrado:', response);
          this.mostrarMensaje('poster registrado exitosamente.');
          this.posterForm.reset();
          
          // Cerrar el modal e indicar que se agregó una tienda
          this.modalController.dismiss({
            posterAgregada: true, // Indicar que se agregó una tienda
          });
        },
        (error) => {
          console.error('Error al registrar el poster:', error);
          this.mostrarMensaje('Error al registrar el porster.');
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
      posterAgregada: false, // Indicar que no se realizó ninguna acción
    });
  }
}
