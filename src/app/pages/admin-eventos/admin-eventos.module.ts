import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEventosPageRoutingModule } from './admin-eventos-routing.module';

import { AdminEventosPage } from './admin-eventos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminEventosPageRoutingModule
  ],
  declarations: []
})
export class AdminEventosPageModule {}
