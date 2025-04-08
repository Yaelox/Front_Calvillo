import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechazosPageRoutingModule } from './rechazos-routing.module';

import { RechazosPage } from './rechazos.page';
import { MotivoRechazoModalComponent } from 'src/app/components/motivo-rechazo-modal/motivo-rechazo-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechazosPageRoutingModule,
    MotivoRechazoModalComponent
  ],
  declarations: []
})
export class RechazosPageModule {}
