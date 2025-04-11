import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { FotoService,Foto } from 'src/app/services/fotos.service';
import { GaleriaModalComponent } from 'src/app/components/galeria-modal/galeria-modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-fotos-almacen',
  templateUrl: './fotos-almacen.page.html',
  styleUrls: ['./fotos-almacen.page.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FotosAlmacenPage implements OnInit {
  fotos: Foto[] = [];
  isOpen: boolean = false; 
  usuariosMap: { [key: number]: string } = {};


  constructor(
    private fotoService: FotoService,
    private modalController: ModalController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.cargarFotos();
  }

  // Método para abrir el modal con la foto seleccionada
  async openModal(foto: Foto) {
    this.isOpen = true; // Cambiar el valor de isOpen para abrir el modal
    const modal = await this.modalController.create({
      component: GaleriaModalComponent,
      componentProps: { foto: foto }
    });
    return await modal.present();
  }


  cargarFotos() {
    this.fotoService.getFotos().subscribe((fotos) => {
      this.fotos = fotos;
      console.log(fotos);
      // Para cada foto, obtenemos el nombre del usuario por su id
      fotos.forEach((foto) => {
        if (!this.usuariosMap[foto.id_usuario]) {
          this.userService.getUserById(foto.id_usuario).subscribe((usuario) => {
            this.usuariosMap[foto.id_usuario] = usuario.nombre;
          });
        }
      });
    });
  }
}