import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecadorPageRoutingModule } from './checador-routing.module';


import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChecadorPageRoutingModule,
    HeaderComponent
  ],
  declarations: []
})
export class ChecadorPageModule {}
