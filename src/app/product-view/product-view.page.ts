import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from './../api/book.service';
import { File } from '@ionic-native/file/ngx';
import { Downloader,DownloadRequest,NotificationVisibility } from '@ionic-native/downloader/ngx';
import { AlertController } from '@ionic/angular';
import { SqdatabaseService } from './../api/sqdatabase.service';
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
  filename:any;
  fileurl:any;
  // private downloader: Downloader
  wishlistData:any;
  wishlist_index:any;
  
  constructor(private router:Router,private route: ActivatedRoute,private book:BookService,
    private file:File,private downloader: Downloader ,public alertController: AlertController
    ,private activatedRouter: Router,private sqdatabase:SqdatabaseService,
    public loadingController: LoadingController) { 
      if(this.filename != undefined){
        this.file.checkFile(this.file.externalRootDirectory+'Universal-Book/',this.filename).then(_ => {this.file_exist_status = true;
        }).catch(err =>
        {
          this.file_exist_status = false;} );
      }
    
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
    
  if(this.data.downloads[0] != undefined){
    this.filename = this.data.downloads[0].name;
 }
 if(this.data.downloads[0] != undefined){
    this.fileurl = this.data.downloads[0].file;
}
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

  this.file.createDir(this.file.externalRootDirectory, 'Universal-Book', true);
  if(this.fileurl != undefined){
  let url = encodeURI(this.fileurl);

  var request:DownloadRequest={
    uri: url,
    title: this.filename,
    description: '',
    mimeType: '',
    visibleInDownloadsUi: true,
    notificationVisibility: NotificationVisibility.
   VisibleNotifyCompleted,
    destinationInExternalPublicDir: {
        dirType: 'Universal-Book',
        subPath: this.filename 
    }
}

setTimeout(()=>{
this.downloader.download(request).then((location: string) => {console.log("download file");
        
        this.sqdatabase.addBookDownload(this.book_id,"Admin",this.book_name,this.img_src,location);
        this.file_exist_status = true;
      }).catch((error: any) => {this.DownloadAlert('File downloading error.');
        this.file_exist_status = false;});
},1000);

  }
}
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
