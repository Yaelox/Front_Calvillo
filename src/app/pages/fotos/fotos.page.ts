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
  usuario: any = null;

  galeria: Foto[] = [];
  fotoEditando: Foto | null = null;
  editando: boolean = false;

  constructor(
    private fotosService: FotoService,
    private userService: UserService,
    private alertControler: AlertController
  ) {}

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

  async mostrarAlerta(mensaje: string, encabezado: string, color: string) {
    const alert = await this.alertControler.create({
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
    if (!this.titulo || !this.imagen || !this.usuario) {
      this.mostrarAlerta('Faltan datos requeridos.', 'Error', 'alert-warning');
      return;
    }

    const datos: Foto = {
      titulo: this.titulo,
      imagen: this.imagen,
      id_usuario: this.usuario.id_usuario,
      foto_id: this.fotoEditando?.foto_id,
    };

    if (this.editando && this.fotoEditando) {
      // Modo edición
      this.fotosService.updateFoto(datos).subscribe(
        () => {
          this.mostrarAlerta('Foto actualizada correctamente.', 'Éxito', 'alert-success');
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al actualizar la foto:', error);
          this.mostrarAlerta('Error al actualizar la foto.', 'Error', 'alert-danger');
        }
      );
    } else {
      // Nueva foto
      this.fotosService.postFoto(datos).subscribe(
        (respuesta) => {
          this.mostrarAlerta('Foto subida correctamente.', 'Éxito', 'alert-success');
          this.galeria.push(respuesta);
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al subir la foto:', error);
          this.mostrarAlerta('Error al subir la foto.', 'Error', 'alert-danger');
        }
      );
    }
  }

  recargarPagina() {
    window.location.reload();
  }
  
  editarFoto(foto: Foto) {
    this.fotoEditando = { ...foto };
    this.titulo = this.fotoEditando.titulo;
    this.imagen = this.fotoEditando.imagen;
    this.editando = true;
  }

  eliminarFoto(foto: Foto) {
    this.fotosService.deleteFoto(foto.foto_id!).subscribe(
      () => {
        this.mostrarAlerta('Foto eliminada correctamente.', 'Éxito', 'alert-success');
        this.galeria = this.galeria.filter(f => f.foto_id !== foto.foto_id);
      },
      (error) => {
        console.error('Error al eliminar la foto:', error);
        this.mostrarAlerta('Error al eliminar la foto.', 'Error', 'alert-danger');
      }
    );
  }

  resetFormulario() {
    this.titulo = '';
    this.imagen = null;
    this.editando = false;
    this.fotoEditando = null;
    this.fileInput.nativeElement.value = '';
  }
}
