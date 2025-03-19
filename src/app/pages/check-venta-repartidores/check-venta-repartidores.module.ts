import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckVentaRepartidoresPageRoutingModule } from './check-venta-repartidores-routing.module';

import { CheckVentaRepartidoresPage } from './check-venta-repartidores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckVentaRepartidoresPageRoutingModule
  ],
  declarations: []
})
export class CheckVentaRepartidoresPageModule {}
