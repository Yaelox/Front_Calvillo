import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ubicacion, UbicacionesService } from 'src/app/services/ubicacion.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modalcolor',
  templateUrl: './modalcolor.component.html',
  styleUrls: ['./modalcolor.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class ModalcolorComponent implements OnInit {
  @Input() ubicaciones: Ubicacion[] = [];

  ubicacionSeleccionada!: Ubicacion;
  razonSeleccionada: string = ''; // Lo que el usuario selecciona visualmente
  readonly motivoParaBaseDeDatos = 'Motivo_Rojo'; // Lo que se enviará al backend

  constructor(
    private modalController: ModalController,
    private ubicacionService: UbicacionesService
  ) {}

  ngOnInit() {
    if (this.ubicaciones.length > 0) {
      this.ubicacionSeleccionada = this.ubicaciones[0];
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  onUbicacionChange(event: any) {
    const ubicacionId = event.detail.value;
    const ubicacionEncontrada = this.ubicaciones.find(u => u.id === ubicacionId);
    if (ubicacionEncontrada) {
      this.ubicacionSeleccionada = ubicacionEncontrada;
    }
  }

  guardarMotivo() {
    if (!this.razonSeleccionada) {
      console.error('Debe seleccionar un motivo de rechazo');
      return;
    }

    const id = this.ubicacionSeleccionada?.id;
    const motivo = this.motivoParaBaseDeDatos;

    if (id === undefined) {
      console.error('ID de ubicación no definido');
      return;
    }

    this.ubicacionService.actualizarMotivo(id, motivo).subscribe({
      next: (respuesta) => {
        this.modalController.dismiss({
          confirmado: true,
          motivo, // "Motivo_Rojo"
          razon: this.razonSeleccionada, // Ej. "caro", "roban", etc.
          ubicacion: this.ubicacionSeleccionada
        });
      },
      error: (err) => {
        console.error('Error al actualizar motivo:', err);
      }
    });
  }
}
