import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-motivo-rechazo-modal',
  templateUrl: './motivo-rechazo-modal.component.html',
  styleUrls: ['./motivo-rechazo-modal.component.scss'],
  imports: [ReactiveFormsModule, FormsModule, IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class MotivoRechazoModalComponent implements OnInit {
  descripcionRechazo: string = ''; // Almacenará el motivo de rechazo seleccionado

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  // Cerrar el modal sin enviar datos
  dismiss() {
    this.modalController.dismiss();
  }

  // Confirmar el rechazo y enviar la descripción seleccionada
  confirmarRechazo() {
    if (this.descripcionRechazo.trim() !== '') {
      this.modalController.dismiss(this.descripcionRechazo); // Devuelve el motivo al componente principal
    } else {
      console.error('Debe seleccionar un motivo de rechazo');
    }
  }
}
