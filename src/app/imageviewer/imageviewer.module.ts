import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageviewerPageRoutingModule } from './imageviewer-routing.module';

import { ImageviewerPage } from './imageviewer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageviewerPageRoutingModule
  ],
  declarations: [ImageviewerPage]
})
export class ImageviewerPageModule {}
