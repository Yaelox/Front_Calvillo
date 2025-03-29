import { Component} from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { RegistareventoComponent } from 'src/app/components/registarevento/registarevento.component';
import { EventCarouselComponent } from "../../components/event-carousel/event-carousel.component";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PostEventoComponent } from 'src/app/components/post-evento/post-evento.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone:true,
  imports: [ReactiveFormsModule,
     HeaderComponent, FooterComponent, 
     RegistareventoComponent,EventCarouselComponent,
    IonicModule,CommonModule,ReactiveFormsModule,FormsModule]
  })
  
export class EventosPage{

  constructor(
    private modalController: ModalController
  ){}

  async openPostEventModal() {
    const modal = await this.modalController.create({
      component: PostEventoComponent
    });
    await modal.present();
  }

  handleEventForm(eventData: any) {
    console.log('Nuevo evento registrado:', eventData);
    // Aquí puedes enviar los datos al backend o procesarlos según sea necesario
  }
}