import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviosInternacionalesPageRoutingModule } from './envios-internacionales-routing.module';

import { EnviosInternacionalesPage } from './envios-internacionales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviosInternacionalesPageRoutingModule
  ],
  declarations: []
})
export class EnviosInternacionalesPageModule {}
