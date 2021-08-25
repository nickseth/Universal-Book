import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './../api/book.service';
import { LoadingController } from '@ionic/angular';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
// , private fcm: FCM
export class HomePage {
  resultwithid: any;
  result: any;
  result_category: any;
  result2: any;
  constructor(private activatedRouter: Router, private book: BookService
    ,public loadingController: LoadingController) {
    this.getapidata();
// Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      // alert('Push registration success, token: ' + token.value);
      console.log('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );


  }

  viewItem(item_id) {
    this.activatedRouter.navigate(['/product-view', { id: item_id }]);

  }
  viewCategory(category_id,title) {
  
    this.activatedRouter.navigate(['/categoryreader', { cate_id: category_id,title:title }]);
  }

  async getapidata() {
    let loading = await this.loadingController.create({
     cssClass: 'my-custom-class',
     message: 'Please wait...',
   });
   await loading.present();

 
   await this.book.getBooks().subscribe((response) => {

    this.result = response;
    console.log(this.result)
    // console.log(response[0].images[0].src);
    this.book.getCategory().subscribe((response) => {
      this.result_category = response;
    loading.dismiss();
    });
  });

  
 }

  getdataRefresh(event){
    this.book.getBooks().subscribe((response) => {

      this.result = response;
     
      if (event)
    event.target.complete();
}, error => {
  console.log(error);
  if (event)
    event.target.complete();
      // console.log(response[0].images[0].src);
    });
     this.book.getCategory().subscribe(response => {
      this.result_category = response;
      
    });

  }





}
