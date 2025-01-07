import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepartoDomicilioPageRoutingModule } from './reparto-domicilio-routing.module';

import { RepartoDomicilioPage } from './reparto-domicilio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepartoDomicilioPageRoutingModule
  ],
  declarations: []
})
export class RepartoDomicilioPageModule {}
