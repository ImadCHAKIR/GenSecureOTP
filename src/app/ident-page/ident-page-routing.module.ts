import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentPagePage } from './ident-page.page';

const routes: Routes = [
  {
    path: '',
    component: IdentPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentPagePageRoutingModule {}
