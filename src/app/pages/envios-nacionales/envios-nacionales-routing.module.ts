import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviosNacionalesPage } from './envios-nacionales.page';

const routes: Routes = [
  {
    path: '',
    component: EnviosNacionalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviosNacionalesPageRoutingModule {}
