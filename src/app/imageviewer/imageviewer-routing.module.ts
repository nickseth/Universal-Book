import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageviewerPage } from './imageviewer.page';

const routes: Routes = [
  {
    path: '',
    component: ImageviewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageviewerPageRoutingModule {}
