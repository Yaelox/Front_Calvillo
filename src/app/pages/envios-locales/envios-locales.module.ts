import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviosLocalesPageRoutingModule } from './envios-locales-routing.module';

import { EnviosLocalesPage } from './envios-locales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviosLocalesPageRoutingModule
  ],
  declarations: []
})
export class EnviosLocalesPageModule {}
