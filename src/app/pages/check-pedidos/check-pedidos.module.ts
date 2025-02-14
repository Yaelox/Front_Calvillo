import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckPedidosPageRoutingModule } from './check-pedidos-routing.module';

import { CheckPedidosPage } from './check-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckPedidosPageRoutingModule
  ],
  declarations: []
})
export class CheckPedidosPageModule {}
