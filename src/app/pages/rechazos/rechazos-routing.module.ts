import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechazosPage } from './rechazos.page';

const routes: Routes = [
  {
    path: '',
    component: RechazosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechazosPageRoutingModule {}
