import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepartoDomicilioPage } from './reparto-domicilio.page';

const routes: Routes = [
  {
    path: '',
    component: RepartoDomicilioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepartoDomicilioPageRoutingModule {}
