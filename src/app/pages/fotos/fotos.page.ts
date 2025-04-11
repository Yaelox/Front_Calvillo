import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FotoService, Foto } from 'src/app/services/fotos.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.page.html',
  styleUrls: ['./fotos.page.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule,HeaderComponent,ReactiveFormsModule,FormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FotosPage implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  titulo: string = '';
  imagen: string | null = null;
  usuario: any = null;  // Asigna un valor adecuado para el usuario, idealmente desde un servicio de usuario

  galeria: Foto[] = []; // Galería de fotos

  constructor(
    private fotosService: FotoService,
    private userService: UserService,
    private alertControler: AlertController) {}

  // M
  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    const repartidorId = this.userService.getUserIdFromLocalStorage();
    if (repartidorId) {
      this.userService.getUserById(repartidorId).subscribe(
        (usuario) => {
          this.usuario = usuario;
        },
        (error) => {
          console.error('Error al obtener usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del repartidor en localStorage');
    }
  }

  seleccionarImagen() {
    this.fileInput.nativeElement.click();
  }


  
  // Función para mostrar alertas
  async mostrarAlerta(mensaje: string, encabezado: string, color: string) {
    const alert = await this. alertControler.create({
      header: encabezado,
      message: mensaje,
      buttons: ['OK'],
      cssClass: color,
    });
    await alert.present();
  }

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
  guardarImagen() {
    if (!this.titulo) {
      this.mostrarAlerta('Por favor, ingrese un título para la foto.', 'Faltan datos', 'alert-warning');
      return;
    }
  
    if (!this.imagen) {
      this.mostrarAlerta('Por favor, seleccione una imagen.', 'Faltan datos', 'alert-warning');
      return;
    }
  
    if (!this.usuario) {
      this.mostrarAlerta('Usuario no cargado. Intenta nuevamente.', 'Error', 'alert-danger');
      return;
    }
  
    const nuevaFoto: Foto = {
      titulo: this.titulo,
      imagen: this.imagen,
      id_usuario: this.usuario.id_usuario,
    };
  
    this.fotosService.postFoto(nuevaFoto).subscribe(
      (respuesta) => {
        console.log('Foto subida correctamente:', respuesta);
        this.mostrarAlerta('Foto subida correctamente.', 'Éxito', 'alert-success');
        this.galeria.push(respuesta);
        this.titulo = '';
        this.imagen = null;
        this.fileInput.nativeElement.value = '';
      },
      (error) => {
        console.error('Error al subir la foto:', error);
        this.mostrarAlerta('Hubo un error al subir la foto. Intenta nuevamente.', 'Error', 'alert-danger');
      }
    );
  }
}  