import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntosdeventaPageRoutingModule } from './puntosdeventa-routing.module';

import { PuntosdeventaPage } from './puntosdeventa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntosdeventaPageRoutingModule
  ],
  declarations: []
})
export class PuntosdeventaPageModule {}
