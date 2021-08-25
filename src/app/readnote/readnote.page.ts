import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

@Component({
  selector: 'app-readnote',
  templateUrl: './readnote.page.html',
  styleUrls: ['./readnote.page.scss'],
})
export class ReadnotePage implements OnInit {
title:any;
notes_text:any;
// public Editor = ClassicEditor;
public config = {
  placeholder: 'Type the content here!'
}
  constructor(private route:ActivatedRoute,private storage:Storage) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('index');
    this.storage.get('notes').then(val=>{
     this.title = val[id].title;
     this.notes_text = val[id].note_text;
     


     document.addEventListener('copy', (event) => {
      const selection = document.getSelection();
     
      event.preventDefault();
  });
     document.onselectionchange  = (event)=>
     {
      var element = "<p>hello</p>";
      window.getSelection().removeAllRanges();
      let range = document.createRange();
      range.selectNode(typeof element === 'string' ? document.getElementById(element) : element);
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
     }
    })
 
  }

}
