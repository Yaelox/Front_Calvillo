import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agrega-tienda',
  templateUrl: './agrega-tienda.component.html',
  styleUrls: ['./agrega-tienda.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AgregarTiendaComponent {

  // Variables para el formulario
  name: string = '';
  lat: number = 0;
  lon: number = 0;
  state: string = '';

  @Output() storeAdded: EventEmitter<any> = new EventEmitter();

  constructor(private modalController: ModalController) {}

  // Cerrar el modal
  closeModal() {
    this.modalController.dismiss();
  }

  // Enviar la tienda al componente padre
  saveStore() {
    if (this.name && this.lat && this.lon) {
      const newStore = {
        name: this.name,
        lat: this.lat,
        lon: this.lon,
        state: this.state
      };
      this.storeAdded.emit(newStore);
      this.closeModal();  // Cerrar el modal después de agregar
    }
  }
}
