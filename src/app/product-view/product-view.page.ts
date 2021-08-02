import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from './../api/book.service';
import { File } from '@ionic-native/file/ngx';
import { Downloader } from '@ionic-native/downloader/ngx';
import { AlertController } from '@ionic/angular';
import { SqdatabaseService } from './../api/sqdatabase.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.page.html',
  styleUrls: ['./product-view.page.scss'],     
})
export class ProductViewPage implements OnInit {
  data:any;
  img_src:any;
  price:any;
  description:any;
  book_name:any;
  book_id:any;
  colorVar:any;
  file_exist_status:any;
  // private downloader: Downloader
  wishlistData:any;
  wishlist_index:any;
  private fileTransfer: FileTransferObject;  
  constructor(private router:Router,private route: ActivatedRoute,private book:BookService,
    private file:File,private downloader: Downloader ,public alertController: AlertController
    ,private activatedRouter: Router,private sqdatabase:SqdatabaseService,private transfer: FileTransfer,
    public loadingController: LoadingController) { 
      // this.file.checkFile(this.file.externalRootDirectory+'MyEbook/','robert-louis-stevenson_treasure-island.epub').then(_ => {this.file_exist_status = true;
      //  }).catch(err =>
      //  {
      //    this.file_exist_status = false;} );
        }

  ngOnInit() {
    this.book_id = this.route.snapshot.paramMap.get('id');
this.fetchapiData(this.book_id);
  this.addAndFetchWishlist();

  }
  async fetchapiData(id){
    
    let loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
 
  
 
    await this.book.getBookone(id).subscribe((response) => {
    this.data = response;
    this.img_src = this.data.images[0].src; 
    this.price = this.data.price;
    this.book_name = this.data.name;
    this.description = this.data.description;
    loading.dismiss();
	}); 
  }
  addAndFetchWishlist(){
  
    this.sqdatabase.getWishlistData().then(val=>{
      if(val != null){
        val.forEach((element,index) => {
          if(element.id == this.book_id){
         this.wishlist_index = index;
         this.wishlistData = val;
          } 
        });
      }
  
      // this.wishlistData = val;
     
    });
  }

  setwishlist(){

    this.sqdatabase.addBookWishlist(this.book_id,"Admin",this.book_name,this.img_src);
  
      this.wishlistData = true;
    
   
  }
  deletewishlist(){
    this.sqdatabase.deletewishlist1(this.wishlist_index);
   
      this.wishlistData = false;
   
      // book_location
   
  }
  downloadFileone(){

    this.activatedRouter.navigate(['/bookreader', { book_location: 2 }]);
    // let url = encodeURI("https://standardebooks.org/ebooks/robert-louis-stevenson/treasure-island/downloads/robert-louis-stevenson_treasure-island.epub");  
    // //here initializing object.  
    // this.file.createDir(this.file.externalRootDirectory, 'Universal Book', true);
    // this.fileTransfer = this.transfer.create();  
    // // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
    // this.fileTransfer.download(url, this.file.externalRootDirectory+"Universal Book/" + "robert-louis-stevenson_treasure-island.epub", true).then((entry) => {  
    //     //here logging our success downloaded file path in mobile.  
    //     this.DownloadAlert('download completed: ' + entry.toURL());  
    // }, (error) => {  
    //     //here logging our error its easier to find out what type of error occured.  
    //     this.DownloadAlert('download failed: ' + error);  
    // });  
  }

//   downloadFileone(){

//   // this.file.createDir(this.file.externalRootDirectory, 'MyEbook', true);
//   let url = encodeURI("https://standardebooks.org/ebooks/robert-louis-stevenson/treasure-island/downloads/robert-louis-stevenson_treasure-island.epub");

//   var DownloadRequest = {
//     uri: url,
//     title: 'My Ebook',
//     description: '',
//     mimeType: '',
//     visibleInDownloadsUi: true,
//     showNotification: true,
//     destinationInExternalPublicDir: {
//         dirType: 'MyEbook',
//         subPath: 'robert-louis-stevenson_treasure-island.epub'
//     }
// }

// setTimeout(()=>{
// this.downloader.download(DownloadRequest)
//         .then((location: string) => {console.log("download file");
//         this.file_exist_status = true;
//         this.sqdatabase.addBookDownload(this.book_id,"Admin",this.book_name,this.img_src,location);
//   //      var admin_file = this.sqdatabase.adddownloadedBook('12','Dipak',`${location}`);
//   //  this.DownloadAlert(admin_file);
//   //         this.DownloadAlert(this.sqdatabase.getDownloadedBook());
       
       
//       })
//         .catch((error: any) => {this.DownloadAlert('File downloading error.');
//         this.file_exist_status = false;});
// },1000);

//   }
  async DownloadAlert(erro){
    const alert = await this.alertController.create({
      message: erro,
      buttons:[{
        text: 'Ok',
        role: 'cancel'
      }]
    });
    await alert.present();
    }  
    
    readFile(item_id){
      this.activatedRouter.navigate(['/bookreader', { id: item_id }]);
    }
}
