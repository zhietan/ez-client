import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TentangkamiPage } from './tentangkami.page';

const routes: Routes = [
  {
    path: '',
    component: TentangkamiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TentangkamiPageRoutingModule {}
