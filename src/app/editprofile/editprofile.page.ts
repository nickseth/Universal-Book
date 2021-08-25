import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from "@angular/forms";
import { ModalController } from '@ionic/angular';
import { ImageviewerPage } from '../imageviewer/imageviewer.page';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  ionicForm: FormGroup;
  requestOptions: any;
  username:any='';
  first_name:any='';
  last_name:any='';
  email:any='';
  constructor(public formBuilder: FormBuilder,public modalController: ModalController) { 

    this.ionicForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      username:[''],
      email:[''],
      oldPassword:[''],
      ConfiPassword:[''],
      newPassword:['']
   })
  }

  ngOnInit() {
    this.username = 'BhupendraSingh';
    this.first_name='Bhupendra';
    this.last_name='Singh';
    this.email='bhupendra@gmail.com';
  }
  
  submitForm(){
    console.log(this.ionicForm.value);
  }

  async presentimageModal() {
    const modal = await this.modalController.create({
      component: ImageviewerPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      animated:true,
      presentingElement: await this.modalController.getTop()
    });
    return await modal.present();
  }

}
