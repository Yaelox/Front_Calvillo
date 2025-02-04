import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckEnviosPageRoutingModule } from './check-envios-routing.module';

import { CheckEnviosPage } from './check-envios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckEnviosPageRoutingModule
  ],
  declarations: []
})
export class CheckEnviosPageModule {}
