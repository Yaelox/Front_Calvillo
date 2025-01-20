import { Component} from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { RegistareventoComponent } from 'src/app/components/registarevento/registarevento.component';
import { EventCarouselComponent } from "../../components/event-carousel/event-carousel.component";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ReactiveFormsModule, HeaderComponent, FooterComponent, RegistareventoComponent, EventCarouselComponent]
})
export class EventosPage{


  handleEventForm(eventData: any) {
    console.log('Nuevo evento registrado:', eventData);
    // Aquí puedes enviar los datos al backend o procesarlos según sea necesario
  }
}