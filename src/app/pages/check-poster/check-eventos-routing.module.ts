import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckEventosPage } from './check-eventos.page';

const routes: Routes = [
  {
    path: '',
    component: CheckEventosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckEventosPageRoutingModule {}
