import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckHistorialPage } from './check-historial.page';

const routes: Routes = [
  {
    path: '',
    component: CheckHistorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckHistorialPageRoutingModule {}
