import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutasForaneasPage } from './rutas-foraneas.page';

const routes: Routes = [
  {
    path: '',
    component: RutasForaneasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutasForaneasPageRoutingModule {}
