import { Component, OnInit } from '@angular/core';
// import { Browser } from '@capacitor/browser';
import { DocumentViewer , DocumentViewerOptions} from '@ionic-native/document-viewer/ngx';
import { SqdatabaseService } from './../api/sqdatabase.service';

declare var $;

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.page.html',
  styleUrls: ['./pdf-viewer.page.scss'],
})
export class PdfViewerPage implements OnInit {
  bklocation:any;
  constructor(private document: DocumentViewer,
    private sqdatabase:SqdatabaseService) { }

  ngOnInit() {

    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    
    this.document.viewDocument('src/assets/first.pdf', 'application/pdf', options)
  
      this.sqdatabase.getDownloadedBookLocation().then(val=>{
        // this.bklocation = val;
      // let url =  this.bklocation[0].book_location;
  val.forEach(element => {
    this.bklocation = element.book_location;
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    
    this.document.viewDocument(this.bklocation, 'application/pdf', options)

  });
      });

    
  }
  


}


