import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { PosterService } from 'src/app/services/poster.service';
@Component({
  selector: 'app-editar-poster',
  templateUrl: './editar-poster.component.html',
  styleUrls: ['./editar-poster.component.scss'],
  imports:[CommonModule,IonicModule,ReactiveFormsModule,FormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class EditarPosterComponent implements OnInit{

 @Input() poster!: { 
  id_eventos: number; 
  nombre: string; 
  fecha: string; 
  ubicacion: string;
  descripcion:string;
};

  constructor(
    private modalController: ModalController,
    private posterService: PosterService,
  ) {}

  ngOnInit() {
    if (this.poster && this.poster.fecha) {
      // Convertir la fecha a formato YYYY-MM-DD si es un objeto Date
      this.poster.fecha = new Date(this.poster.fecha).toISOString().split('T')[0];
    }
  }
  dismiss() {
    this.modalController.dismiss();
  }

  // Actualiza el usuario y cierra la modal si se completa correctamente
  updatePoster() {
    if (!this.poster || !this.poster.id_eventos) {
      console.error("Error: ID del poster no definido", this.poster);
      return;
    }
    const posterToUpdate = {
      nombre: this.poster.nombre,
      fecha: this.poster.fecha,
      ubicacion: this.poster.ubicacion,
      descripcion: this.poster.descripcion
    };
  
    this.posterService.updatePoster(this.poster.id_eventos, posterToUpdate).subscribe(
      () => {
        // Asegúrate de que `this.user` contiene los valores actualizados antes de cerrar el modal
        this.modalController.dismiss(this.poster); 
      },
      (error) => {
        console.error('Error al actualizar el poster', error);
      }
    );
  }
}