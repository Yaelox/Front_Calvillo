import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaOnlinePageRoutingModule } from './tienda-online-routing.module';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendaOnlinePageRoutingModule
  ],
  declarations: []
})
export class TiendaOnlinePageModule {}
