import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FotoService, Foto } from 'src/app/services/fotos.service';
import { GaleriaModalComponent } from 'src/app/components/galeria-modal/galeria-modal.component';

@Component({
  selector: 'app-fotos-almacen',
  templateUrl: './fotos-almacen.page.html',
  styleUrls: ['./fotos-almacen.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FotosAlmacenPage implements OnInit {
  fotosAgrupadas: { [fecha: string]: any[] } = {};
  fotosSeleccionadas: any[] = []; // Default empty array

  fechaSeleccionada: string = '';

  constructor(
    private fotosService: FotoService,
    private modalctrl:ModalController) {}

  ngOnInit() {
    this.fotosService.getFotosAgrupadas().subscribe(data => {
      console.log('Fotos agrupadas recibidas:', data);  // Verifica lo que recibes del servicio
      this.fotosAgrupadas = data;
    }, error => {
      console.error('Error al obtener fotos agrupadas:', error);  // Si hay error en la solicitud
    });
  }

  async abrirModal(foto: Foto) {
    const modal = await this.modalctrl.create({
      component: GaleriaModalComponent,
      componentProps: {
        imagen: foto.imagen,
        titulo: foto.titulo
      },
      showBackdrop: true,
      cssClass: 'galeria-modal-clase'
    });
  
    await modal.present();
  }

  onFechaSeleccionada(valor: string | string[]) {
    const fecha = Array.isArray(valor) ? valor[0] : valor;
    console.log('Fecha seleccionada:', fecha);  // Verifica qué fecha estás recibiendo

    const soloFecha = fecha.split('T')[0]; // Quita la hora y deja solo la fecha
    console.log('Fecha sin hora:', soloFecha);  // Verifica el formato de la fecha después de quitar la hora

    this.fechaSeleccionada = soloFecha;

    // Verifica qué fotos se están seleccionando para esa fecha
    this.fotosSeleccionadas = this.fotosAgrupadas[soloFecha] || [];
    console.log('Fotos seleccionadas para la fecha', soloFecha, ':', this.fotosSeleccionadas);  // Verifica las fotos seleccionadas

    // Si no hay fotos, asegúrate de manejarlo
    if (this.fotosSeleccionadas.length === 0) {
      console.log('No hay fotos para la fecha seleccionada');
    }
  }
}
