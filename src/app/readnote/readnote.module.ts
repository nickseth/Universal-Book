import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadnotePageRoutingModule } from './readnote-routing.module';

import { ReadnotePage } from './readnote.page';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadnotePageRoutingModule,
    CKEditorModule
  ],
  declarations: [ReadnotePage]
})
export class ReadnotePageModule {}
