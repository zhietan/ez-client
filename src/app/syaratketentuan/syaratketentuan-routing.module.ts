import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SyaratketentuanPage } from './syaratketentuan.page';

const routes: Routes = [
  {
    path: '',
    component: SyaratketentuanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyaratketentuanPageRoutingModule {}
