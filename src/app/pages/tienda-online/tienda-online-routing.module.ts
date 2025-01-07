import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendaOnlinePage } from './tienda-online.page';

const routes: Routes = [
  {
    path: '',
    component: TiendaOnlinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaOnlinePageRoutingModule {}
