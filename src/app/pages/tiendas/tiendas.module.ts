import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendasPageRoutingModule } from './tiendas-routing.module';

import { TiendasPage } from './tiendas.page';
import { AgregaTiendaComponent } from 'src/app/components/agrega-tienda/agrega-tienda.component';
import { EditarTiendaComponent } from 'src/app/components/editar-tienda/editar-tienda.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendasPageRoutingModule,
  ],
  declarations: []
})
export class TiendasPageModule {}
