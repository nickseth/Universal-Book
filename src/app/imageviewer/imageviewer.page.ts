import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';

@Component({
  selector: 'app-imageviewer',
  templateUrl: './imageviewer.page.html',
  styleUrls: ['./imageviewer.page.scss'],
})
export class ImageviewerPage implements OnInit {
  base64Image:any;
  picture:any;


  constructor(public modalController: ModalController,private file: File, private camera: Camera) { }

  ngOnInit() {
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  readFile(file) {
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();
      formData.append('name', 'Hello');
      formData.append('file', imgBlob, file.name);
      
      var myEl = document.querySelector('#imagepreview');
      myEl.innerHTML = `${formData}`;
      // var img = document.createElement("img");
      // img.src = file.localURL;
      // img.style.cssText += 'margin-left:10px; box-shadow: var(--box-shadow3);';
      // myEl.appendChild(img);
      // this.uploadService.uploadFile(formData).subscribe(dataRes => {
      //   console.log(dataRes);
      // });
    };
    reader.readAsArrayBuffer(file);
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(imageData => {
     
      let base64Image = "data:image/jpeg;base64," +imageData;
      this.picture = base64Image;
      this.readFile(imageData);
      alert(this.picture)
     }, (err) => {

    console.log(err);

     });
  }

  AccessGallery(){

    this.camera.getPicture({
   
       sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
   
       destinationType: this.camera.DestinationType.DATA_URL
   
      }).then((imageData) => {
   
        this.base64Image = "data:image/jpeg;base64,"+ imageData;
   
        this.picture = this.base64Image;
        alert(this.picture)
           }, (err) => {
   
        console.log(err);
   
      });
   
   }
}
