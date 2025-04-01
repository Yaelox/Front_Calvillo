import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventosPageRoutingModule } from './eventos-routing.module';



import { PostEventoComponent } from 'src/app/components/post-evento/post-evento.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { RegistareventoComponent } from 'src/app/components/registarevento/registarevento.component';
import { EventCarouselComponent } from 'src/app/components/event-carousel/event-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventosPageRoutingModule,
    PostEventoComponent,
    HeaderComponent,
    FooterComponent,
    RegistareventoComponent,
    EventCarouselComponent
  ],
  declarations: []
})
export class EventosPageModule {}
