import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreventaPageRoutingModule } from './preventa-routing.module';
import { AgregaTiendaComponent } from 'src/app/components/agrega-tienda/agrega-tienda.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreventaPageRoutingModule,
    AgregaTiendaComponent,
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent
  ],
  declarations: [],
})
export class PreventaPageModule {}
