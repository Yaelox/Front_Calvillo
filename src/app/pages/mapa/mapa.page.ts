import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarTiendaComponent } from '../../components/agrega-tienda/agrega-tienda.component';
import { PreventaMapComponent } from 'src/app/components/preventa-map/preventa-map.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[PreventaMapComponent,HeaderComponent,FooterComponent]
})
export class MapaPage implements OnInit {

    // Lista de tiendas (marcadores)
    markersArray: any[] = [];
  
    constructor(private modalController: ModalController) {}
  
    ngOnInit() {}
  
    // Función para abrir el modal de agregar tienda
    async addStoree() {
      const modal = await this.modalController.create({
        component: AgregarTiendaComponent,
      });
  
      // Al cerrar el modal, agregar la tienda al mapa
      modal.onDidDismiss().then((data) => {
        if (data.data) {
          this.addStore(data.data);  // Recibir la tienda del modal y agregarla al mapa
        }
      });
  
      return await modal.present();
    }
  
    // Función para agregar una tienda (marcador) al mapa
    addStore(store: any) {
      this.markersArray.push(store);  // Añadir la tienda a la lista de marcadores
    }
  }