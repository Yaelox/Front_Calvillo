import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviosLocalesPage } from './envios-locales.page';

const routes: Routes = [
  {
    path: '',
    component: EnviosLocalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviosLocalesPageRoutingModule {}
