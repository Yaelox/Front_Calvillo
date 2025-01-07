import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutasForaneasPageRoutingModule } from './rutas-foraneas-routing.module';

import { RutasForaneasPage } from './rutas-foraneas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutasForaneasPageRoutingModule
  ],
  declarations: []
})
export class RutasForaneasPageModule {}
