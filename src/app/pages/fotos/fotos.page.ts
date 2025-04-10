import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FotoService, Foto } from 'src/app/services/fotos.service';


@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule,HeaderComponent,ReactiveFormsModule,FormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FotosPage {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  titulo: string = '';
  imagen: string | null = null;
  id_usuario: number = 1; // Asigna un valor adecuado para el usuario, idealmente desde un servicio de usuario

  galeria: Foto[] = []; // Galería de fotos

  constructor(private fotosService: FotoService) {}

  // Método para abrir el selector de archivos
  seleccionarImagen() {
    this.fileInput.nativeElement.click();
  }

  // Método para leer la imagen seleccionada y convertirla a Base64
  cargarImagen(event: Event) {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        this.imagen = lector.result as string;
      };
      lector.readAsDataURL(archivo);
    }
  }

  // Método para guardar la imagen
  guardarImagen() {
    // Validación explícita para el título
    if (!this.titulo) {
      alert('Por favor, ingrese un título para la foto.');
      return; // Si no hay título, no continúa con el guardado
    }
  
    if (!this.imagen) {
      alert('Por favor, seleccione una imagen.');
      return; // Si no hay imagen, no continúa con el guardado
    }
  
    // Crear el objeto Foto basado en la interfaz Foto
    const nuevaFoto: Foto = {
      foto_id: 0, // Deja este valor como 0, el backend lo asignará
      titulo: this.titulo,
      imagen: this.imagen, // Imagen en formato Base64
      id_usuario: this.id_usuario,
    };
  
    // Llamada al servicio para subir la foto
    this.fotosService.postFoto(nuevaFoto).subscribe(
      (respuesta) => {
        console.log('Foto subida correctamente:', respuesta);
        // Agregar la nueva foto a la galería si se sube correctamente
        this.galeria.push(respuesta);
  
        // Limpiar campos después de subir
        this.titulo = '';
        this.imagen = null;
        this.fileInput.nativeElement.value = '';
      },
      (error) => {
        console.error('Error al subir la foto:', error);
      }
    );
  }
}