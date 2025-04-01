import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InventarioPageRoutingModule } from './inventario-routing.module';


import { HeaderComponent } from 'src/app/components/header/header.component';
import { CrearProductoComponent } from 'src/app/components/crear-producto/crear-producto.component';
import { EditarProductoComponent } from 'src/app/components/editar-producto/editar-producto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventarioPageRoutingModule,
    HeaderComponent,
    CrearProductoComponent,
    EditarProductoComponent
  ],
  declarations: []
})
export class InventarioPageModule {}
