import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartingappPage } from './startingapp.page';

const routes: Routes = [
  {
    path: '',
    component: StartingappPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartingappPageRoutingModule {}
