import { Component, OnInit, Renderer2 } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CalculatorPage } from '../calculator/calculator.page';


@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage{
  darkValue: any;

  constructor(private  storage: Storage,private activatedRouter: Router,public modalController: ModalController) {

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
 
   async presentModal() {
    const modal = await this.modalController.create({
      component: CalculatorPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      animated:true,
      presentingElement: await this.modalController.getTop()
    });
    return await modal.present();
  }

}
