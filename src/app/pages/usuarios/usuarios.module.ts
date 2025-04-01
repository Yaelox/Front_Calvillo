import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';
import { EditarUsersComponent } from 'src/app/components/editar-users/editar-users.component';
import { AgregarUsuarioComponent } from 'src/app/components/agregar-usuario/agregar-usuario.component';
;


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule,
    EditarUsersComponent,
    AgregarUsuarioComponent
  ],
  declarations: [],
})
export class UsuariosPageModule {}
