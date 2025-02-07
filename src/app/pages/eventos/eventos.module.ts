import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventosPageRoutingModule } from './eventos-routing.module';


import { EventosPage } from './eventos.page';
import { PostEventoComponent } from 'src/app/components/post-evento/post-evento.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventosPageRoutingModule,
    PostEventoComponent
  ],
  declarations: []
})
export class EventosPageModule {}
