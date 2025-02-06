import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TiendaService } from 'src/app/services/tienda.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-editar-tienda',
  templateUrl: './editar-tienda.component.html',
  styleUrls: ['./editar-tienda.component.scss'],
  imports:[CommonModule,ReactiveFormsModule,FormsModule,IonicModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EditarTiendaComponent{
// Datos del usuario (en un caso real, podrías obtenerlos de un servicio o API)
@Input() tienda!: {
   id_tienda: number;
    nombre_tienda: string; 
    direccion: string;
    telefono: string;
    email: string; 
    id_usuario: number;
    frecuencia_visitas: string;
  };

  usuarios: any[] = [];


 
 
  constructor(
    private modalController: ModalController,
    private tiendaService: TiendaService,
    private userService : UserService
  ) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  dismiss() {
    this.modalController.dismiss();
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


  // Actualiza el usuario y cierra la modal si se completa correctamente
  updateTienda() {
    if (!this.tienda || !this.tienda.id_tienda) {
      console.error("Error: ID del usuario no definido", this.tienda);
      return;
    }
    const tiendaToUpdate = {
      nombre_tienda: this.tienda.nombre_tienda,
      direccion: this.tienda.direccion,
      telefono:this.tienda.telefono,
      email: this.tienda.email,
      id_usuario: this.tienda.id_usuario,
      frecuencia_visitas: this.tienda.frecuencia_visitas
    };
  
    this.tiendaService.updateTienda(this.tienda.id_tienda, tiendaToUpdate).subscribe(
      () => {
        // Asegúrate de que `this.user` contiene los valores actualizados antes de cerrar el modal
        this.modalController.dismiss(this.tienda); 
      },
      (error) => {
        console.error('Error al actualizar la tienda', error);
      }
    );
  }
}

