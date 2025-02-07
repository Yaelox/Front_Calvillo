import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckEventosPageRoutingModule } from './check-eventos-routing.module';

import { CheckEventosPage } from './check-eventos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckEventosPageRoutingModule
  ],
  declarations: []
})
export class CheckEventosPageModule {}
