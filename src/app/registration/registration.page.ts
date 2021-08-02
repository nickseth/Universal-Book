import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from "@angular/forms";
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  ionicForm: FormGroup;
  requestOptions: any;
  constructor(public formBuilder: FormBuilder,public http: HttpClient,private router: Router) {
    this.ionicForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      username:[''],
      email: [''],
      password: ['']
   })

   }

  ngOnInit() {}


  async submitForm() {

    let headers = new HttpHeaders({
    "Content-type": "application/json",
    "Authorization": "Basic eW91bGliNTVAZ21haWwuY29tOlVuaXZlcnNAbGIwMGtfMTIzJCU=",

   });

   let options = {
      headers: headers
   }
 
   await this.http.post('https://universalbooks.wpengine.com/wp-json/wp/v2/users', JSON.stringify(this.ionicForm.value),options)
    .subscribe(data => {
      this.ionicForm.reset();
    this.router.navigate(['/login']); 
     }, error => {
alert(error.error.message);
this.ionicForm.reset();
        
    });

    
  }

}
