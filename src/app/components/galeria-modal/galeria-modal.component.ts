import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonModal } from "@ionic/angular/standalone";

@Component({
  selector: 'app-galeria-modal',
  templateUrl: './galeria-modal.component.html',
  styleUrls: ['./galeria-modal.component.scss'],
  imports:[CommonModule,IonicModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class GaleriaModalComponent {
    @Input() foto: any;  // Foto recibida como input
     selectedImage!: string;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    if (this.foto) {
      this.selectedImage = this.foto.imagen;  // Asigna la imagen seleccionada
    }
  }

  closeModal() {
    this.modalController.dismiss();  // Cierra el modal
  }
}