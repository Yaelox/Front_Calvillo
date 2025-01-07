import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuntosdeventaPage } from './puntosdeventa.page';

const routes: Routes = [
  {
    path: '',
    component: PuntosdeventaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuntosdeventaPageRoutingModule {}
