import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckContactosPage } from './check-contactos.page';

const routes: Routes = [
  {
    path: '',
    component: CheckContactosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckContactosPageRoutingModule {}
