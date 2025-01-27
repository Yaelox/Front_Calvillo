import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreventaPageRoutingModule } from './preventa-routing.module';
import { AgregaTiendaComponent } from 'src/app/components/agrega-tienda/agrega-tienda.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreventaPageRoutingModule,
    AgregaTiendaComponent,
    ReactiveFormsModule
  ],
  declarations: [],
})
export class PreventaPageModule {}
