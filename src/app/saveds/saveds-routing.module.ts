import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedsPage } from './saveds.page';

const routes: Routes = [
  {
    path: '',
    component: SavedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedsPageRoutingModule {}
