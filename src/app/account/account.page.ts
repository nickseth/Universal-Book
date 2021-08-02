import { Component, OnInit, Renderer2 } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage{
  darkValue: any;

  constructor(private  storage: Storage) {

    this.storage.get('dark').then((ev) => {
      if(ev){
        this.darkValue = true;
      }
    });

  }

  setTheme(ev){
    if(ev.detail.checked){
      document.body.classList.add('dark');
     } else{
       document.body.classList.remove('dark');
     }
     localStorage.test = ev.detail.checked;
     this.storage.set('dark', ev.detail.checked);
    
   }

}
