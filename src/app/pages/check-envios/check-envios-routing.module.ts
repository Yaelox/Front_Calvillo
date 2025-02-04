import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckEnviosPage } from './check-envios.page';

const routes: Routes = [
  {
    path: '',
    component: CheckEnviosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckEnviosPageRoutingModule {}
