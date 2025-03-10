import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckHistorialPageRoutingModule } from './check-historial-routing.module';

import { CheckHistorialPage } from './check-historial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckHistorialPageRoutingModule
  ],
  declarations: []
})
export class CheckHistorialPageModule {}
