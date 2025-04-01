import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendasPageRoutingModule } from './tiendas-routing.module';

import { AgregaTiendaComponent } from 'src/app/components/agrega-tienda/agrega-tienda.component';
import { EditarTiendaComponent } from 'src/app/components/editar-tienda/editar-tienda.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendasPageRoutingModule,
    AgregaTiendaComponent,
    EditarTiendaComponent,
    HeaderComponent
  ],
  declarations: []
})
export class TiendasPageModule {}
