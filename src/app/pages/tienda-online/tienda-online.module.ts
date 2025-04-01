import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaOnlinePageRoutingModule } from './tienda-online-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendaOnlinePageRoutingModule,
    HeaderComponent,
    FooterComponent
  ],
  declarations: []
})
export class TiendaOnlinePageModule {}
