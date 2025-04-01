import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckEventosPageRoutingModule } from './check-eventos-routing.module';

import { CheckEventosPage } from './check-eventos.page';
import { AgregarPosterComponent } from 'src/app/components/agregar-poster/agregar-poster.component';
import { EditarPosterComponent } from 'src/app/components/editar-poster/editar-poster.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckEventosPageRoutingModule,
    AgregarPosterComponent,
    EditarPosterComponent
  ],
  declarations: []
})
export class CheckEventosPageModule {}
