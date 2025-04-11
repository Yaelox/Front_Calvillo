import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotosAlmacenPageRoutingModule } from './fotos-almacen-routing.module';

import { FotosAlmacenPage } from './fotos-almacen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotosAlmacenPageRoutingModule
  ],
  declarations: []
})
export class FotosAlmacenPageModule {}
