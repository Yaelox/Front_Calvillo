import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckContactosPageRoutingModule } from './check-contactos-routing.module';

import { CheckContactosPage } from './check-contactos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckContactosPageRoutingModule
  ],
  declarations: []
})
export class CheckContactosPageModule {}
