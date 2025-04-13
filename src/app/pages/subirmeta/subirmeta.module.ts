import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubirmetaPageRoutingModule } from './subirmeta-routing.module';

import { SubirmetaPage } from './subirmeta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubirmetaPageRoutingModule
  ],
  declarations: []
})
export class SubirmetaPageModule {}
