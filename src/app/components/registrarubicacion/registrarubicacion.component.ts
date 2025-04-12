import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-registrarubicacion',
  templateUrl: './registrarubicacion.component.html',
  styleUrls: ['./registrarubicacion.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegistrarUbicacionComponent {
  @Input() lat!: number;
  @Input() lon!: number;
  nombre_tienda: string = '';

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    console.log('Modal cerrado sin confirmar');
    this.modalCtrl.dismiss();
  }

  confirmar() {
    console.log('Confirmar clickeado');
    
    if (!this.nombre_tienda.trim()) {
      alert('Por favor, ingresa el nombre de la tienda');
      return;
    }

    console.log('Nombre tienda:', this.nombre_tienda);
    console.log('Latitud:', this.lat);
    console.log('Longitud:', this.lon);

    this.modalCtrl.dismiss({
      confirmado: true,
      data: {
        nombre_tienda: this.nombre_tienda,
        lat: this.lat,
        lon: this.lon,
      },
    });
  }
}
