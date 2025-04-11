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
  // Variables para controlar cada lista
  rechazoRojo: string = '';
  comentarioRojo: string = '';

  rechazoAmarillo: string = '';
  comentarioAmarillo: string = '';

  rechazoVerde: string = '';
  comentarioVerde: string = '';

  motivoSeleccionado: boolean = false; // Indica si se ha seleccionado un motivo

  // Listas
  motivosRojo: string[] = [
    'No tiene espacio en el mostrador',
    'No se vende este tipo de dulce aquí',
    'No se vendió el producto aquí',
    'Aquí la gente compra de 1 peso',
    'Le parece caro el producto',
    'No vende dulces sueltos',
    'No vende dulces que se tiene que meter la mano',
    'No le interesa',
    'Va a traspasar la tienda',
    'Va a quitar la tienda',
    'Ya tienen proveedor',
    'Se los roba la gente',
    'Otra causa de rechazo.'
  ];

  motivosAmarillo: string[] = [
    'Ahorita no',
    'Para otra vuelta',
    'No está quien decide las compras',
    'Sí le interesa pero no tiene dinero',
    'Sí le interesa pero más adelante porque están bajas las ventas',
    'Sí le interesa porque va a abrir un espacio',
    'Acaba de surtir dulces',
    'Ahorita se vende poco por el calor',
    'Otra causa de rechazo momentáneo'
  ];

  motivosVerde: string[] = [
    'Mucho interés',
    'Interés',
    'Poco interés, le va calar',
    'Puedes dejarnos un comentario aquí...'
  ];

  onSeleccion(color: string) {
    console.log('Seleccionado color:', color);

    if (color === 'rojo') {
      this.rechazoAmarillo = '';
      this.rechazoVerde = '';
      this.comentarioAmarillo = '';
      this.comentarioVerde = '';
      // Asignar el motivo de rechazo seleccionado
      this.descripcionRechazo = this.rechazoRojo;
    } else if (color === 'amarillo') {
      this.rechazoRojo = '';
      this.rechazoVerde = '';
      this.comentarioRojo = '';
      this.comentarioVerde = '';
      // Asignar el motivo de rechazo seleccionado
      this.descripcionRechazo = this.rechazoAmarillo;
    } else if (color === 'verde') {
      this.rechazoRojo = '';
      this.rechazoAmarillo = '';
      this.comentarioRojo = '';
      this.comentarioAmarillo = '';
      // Asignar el motivo de rechazo seleccionado
      this.descripcionRechazo = this.rechazoVerde;
    }

    console.log('Descripción de rechazo seleccionada:', this.descripcionRechazo);

    // Cuando se selecciona cualquier motivo, habilitar el botón de Cancelar
    this.motivoSeleccionado = true;
  }

  cancelarSeleccion() {
    console.log('Cancelando selección...');
    this.rechazoRojo = '';
    this.rechazoAmarillo = '';
    this.rechazoVerde = '';
    this.comentarioRojo = '';
    this.comentarioAmarillo = '';
    this.comentarioVerde = '';
    this.descripcionRechazo = '';
    this.motivoSeleccionado = false; // Oculta el botón de cancelar

    console.log('Selección cancelada:', this.descripcionRechazo);
  }

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  // Cerrar el modal sin enviar datos
  dismiss() {
    console.log('Cerrando modal...');
    this.modalController.dismiss();
  }

  // Confirmar el rechazo y enviar la descripción seleccionada
  confirmarRechazo() {
    console.log('Confirmar rechazo con descripción:', this.descripcionRechazo);

    if (this.descripcionRechazo.trim() !== '') {
      this.modalController.dismiss(this.descripcionRechazo); // Devuelve el motivo al componente principal
    } else {
      console.error('Debe seleccionar un motivo de rechazo');
    }
  }
}
