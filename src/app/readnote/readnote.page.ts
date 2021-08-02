import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

@Component({
  selector: 'app-readnote',
  templateUrl: './readnote.page.html',
  styleUrls: ['./readnote.page.scss'],
})
export class ReadnotePage implements OnInit,Plugin {
title:any;
notes_text:any;
public Editor = ClassicEditor;
public config = {
  placeholder: 'Type the content here!'
}
  constructor(private route:ActivatedRoute,private storage:Storage) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('index');
    this.storage.get('notes').then(val=>{
     this.title = val[id].title;
     this.notes_text = val[id].note_text;
  
    })
 
  }

}
