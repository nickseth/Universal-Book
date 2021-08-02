import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  notes_data:any;
  constructor(private storage:Storage,private route:Router,private alertController:AlertController) { }

  ngOnInit() {
    this.dataRetrieve()
  
  }
  dataRetrieve(){
    this.storage.get('notes').then(val=>{
      this.notes_data = val;
    })
  }
  viewItem(index) {
 
    this.route.navigate(['/readnote', { index: index }]);

  }
  deleteItem(index){
    let notes_array = this.storage.get('notes');
    notes_array.then(val=>{
      val.splice(index, 1);
      this.storage.set('notes', notes_array);
      setTimeout(() => {
        this.dataRetrieve() 
      }, 1000);
     
     })
  }
    async editNotesModel(index,title,text,location,book_id) {
      const alert = await this.alertController.create({
        inputs: [
          {
            name: 'notesName',
            value:title,
            placeholder: 'Notes Title'
          },
          {
            name: 'text1',
            type: 'textarea',
            value: text,
          }
        ],
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'update',
          handler: data => {
            this.updateNotes(index,data.notesName,data.text1,location,book_id);
          }
        }
        ]
  
      });
      await alert.present();
    }
  updateNotes(index,title,text,location,book_id){
    let notes1 = this.storage.get('notes');
    let list_notes = { book_id: book_id,location:location,note_text: text,title:title }

    notes1.then(val => {

  val[index] = list_notes;
        this.storage.set('notes', notes1);
    })
    setTimeout(() => {
      this.dataRetrieve() 
    }, 1000);
  }

}
