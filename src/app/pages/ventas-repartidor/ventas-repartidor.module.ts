import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentasRepartidorPageRoutingModule } from './ventas-repartidor-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VentasRepartidorPageRoutingModule,


  ],
  declarations: []
})
export class VentasRepartidorPageModule {}
