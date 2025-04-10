import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetaDelDiaPage } from './meta-del-dia.page';

const routes: Routes = [
  {
    path: '',
    component: MetaDelDiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetaDelDiaPageRoutingModule {}
