import { Component, OnInit } from '@angular/core';
import { SqdatabaseService } from './../api/sqdatabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.page.html',
  styleUrls: ['./mybooks.page.scss'],
})
export class MybooksPage implements OnInit {
  bookData:any;
  constructor(private sqdatabase:SqdatabaseService,private activatedRouter:Router) { 
  }

  ngOnInit() {
    this.sqdatabase.getDownloadedBookLocation().then(val=>{
      this.bookData = val;
      
     
    });
    
  }
  getUsersList(event) {
    return  this.sqdatabase.getDownloadedBookLocation().then(val=>{
      this.bookData = val;

        if (event)
          event.target.complete();
      }, error => {
        console.log(error);
        if (event)
          event.target.complete();
      })
  }
  viewItem(book_location) {
    this.activatedRouter.navigate(['/bookreader', { book_location: book_location }]);

  }

}
