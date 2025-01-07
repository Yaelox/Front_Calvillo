import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviosNacionalesPageRoutingModule } from './envios-nacionales-routing.module';

import { EnviosNacionalesPage } from './envios-nacionales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviosNacionalesPageRoutingModule
  ],
  declarations: []
})
export class EnviosNacionalesPageModule {}
