import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckPedidosPage } from './check-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: CheckPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckPedidosPageRoutingModule {}
