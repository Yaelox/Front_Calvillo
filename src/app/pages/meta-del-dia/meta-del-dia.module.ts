import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetaDelDiaPageRoutingModule } from './meta-del-dia-routing.module';

import { MetaDelDiaPage } from './meta-del-dia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetaDelDiaPageRoutingModule
  ],
  declarations: []
})
export class MetaDelDiaPageModule {}
