import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { SqdatabaseService } from './../api/sqdatabase.service';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
declare var $;
@Component({
  selector: 'app-readnote',
  templateUrl: './readnote.page.html',
  styleUrls: ['./readnote.page.scss'],
})
export class ReadnotePage implements OnInit {
title1:any='';
notes_text:any='';
// public Editor = ClassicEditor;
public config = {
  placeholder: 'Type the content here!'
}
  constructor(private route:ActivatedRoute,private storage:Storage,public sqdatabaseService:SqdatabaseService) { }
  ngOnInit() {
   this.dataFetch();
    document.addEventListener('cut', this.cutCopyHandler);
    document.addEventListener('copy', this.cutCopyHandler);
  }
  dataFetch(){
    let id = this.route.snapshot.paramMap.get('index');
    this.storage.get('notes').then(val=>{
      if(id != null){
     this.title1 = val[id].title;
     this.notes_text = val[id].note_text;
     } 
    })
  }
  cutCopyHandler(e){
    e.preventDefault();
    const selection = document.getSelection();
    e.clipboardData.setData(
      'text/plain',
      'hello'
    );
    // if (e.type === 'cut') selection.deleteFromDocument();
    // const selection = document.getSelection();
    // e.clipboardData.setData(
    //   'text/plain',
    //   'hello'
    // );
  }
  createNew(){
    let val1 = document.getElementById('newtitle').textContent;
    let title1 = document.getElementById('newcontent');
console.log(val1)
    // this.sqdatabaseService.createNotes('12',val1,title1);
  //   setTimeout(() => {
  //     this.dataFetch();
  //   }, 1000);
  }
}