import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentasRepartidorPageRoutingModule } from './ventas-repartidor-routing.module';

import { VentasRepartidorPage } from './ventas-repartidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentasRepartidorPageRoutingModule,
  ],
  declarations: []
})
export class VentasRepartidorPageModule {}
