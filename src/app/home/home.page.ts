import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './../api/book.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage {
  resultwithid: any;
  result: any;
  result_category: any;
  result2: any;
  constructor(private activatedRouter: Router, private book: BookService,public loadingController: LoadingController) {
    this.getapidata();

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
