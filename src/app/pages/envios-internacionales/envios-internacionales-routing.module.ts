import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviosInternacionalesPage } from './envios-internacionales.page';

const routes: Routes = [
  {
    path: '',
    component: EnviosInternacionalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviosInternacionalesPageRoutingModule {}
