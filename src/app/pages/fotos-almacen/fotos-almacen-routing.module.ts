import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotosAlmacenPage } from './fotos-almacen.page';

const routes: Routes = [
  {
    path: '',
    component: FotosAlmacenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotosAlmacenPageRoutingModule {}
