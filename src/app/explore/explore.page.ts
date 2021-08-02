import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './../api/book.service';
import { LoadingController } from '@ionic/angular';
import  { NavController} from '@ionic/angular';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss'],
})
export class ExplorePage {
  data: any;
  title_cate: any;
  img_url: any;
  data2: any;
  loading:any;
  // id_id_1: any;


  constructor( private router: Router,private book: BookService,public loadingController: LoadingController,public nav: NavController) {

    // this.id_id_1 = [];
 
this.presentLoading();
    this.book.getCategory().subscribe((response) => {
      this.data = response;
      let len = this.data.length;

      for (let i = 0; i < len; i++) {

        this.book.getCategoryOnes(this.data[i].id).subscribe((response) => {
          this.data2 = response;
          let len2 = this.data2.length;

          this.title_cate = this.data[i].name;
          var category_id = this.data[i].id;
           var title = this.data[i].name;

          var div = document.createElement("DIV");
          div.className = 'div_hedding';
          div.style.cssText += 'padding:10px;justify-content: space-between;display: flex;';

          var h1 = document.createElement("H5");
          h1.innerHTML = `${this.title_cate}`;
          var p1 = document.createElement("P");
          p1.innerHTML = "See All";
          p1.className = 'click_all';
          p1.onclick = function () {

            router.navigate(['/categoryreader', { cate_id: category_id,title: title }]);
          }
          p1.style.cssText += 'color:blue; margin-right:10px;font-size:14px';


          var myEl = document.querySelector('#divID');

          myEl.append(div);
          div.appendChild(h1);
          div.appendChild(p1);
          var div2 = document.createElement("DIV");
          div2.className = 'scroll-first';
          div2.style.cssText += 'white-space: nowrap;width: auto;height: 80px;overflow-y: hidden;overflow-x: auto;scrollX:true';

          var div4 = document.createElement("DIV");

          for (let j = 0; j < len2; j++) {
            let id = this.data2[j].id;
            
            // if (typeof id !== 'undefined') {


            //   this.id_id_1.push(this.data2[j].id);

            // }
            var div3 = document.createElement("DIV");
            div3.className = 'scroll-item';

            this.img_url = this.data2[j].images[0].src;
            if (typeof this.img_url !== 'undefined') {
              var image = document.createElement("img");
              image.src = `${this.data2[j].images[0].src}`;
              image.style.marginLeft = "10px"
              image.classList.add('click-scroll' + id);
              image.setAttribute("attr" + id, id);
              image.onclick=function () {
                router.navigate(['/product-view', { id: id }]);
              }

              div4.style.cssText += 'width:100px;height:auto';
              div3.appendChild(div4);
              div4.appendChild(image);
              myEl.append(div2);
              div2.appendChild(div3);

              this.loading.dismiss();
            } else {

            }

          }


        });
      }
    });
    // setTimeout(() => {
    //   var book_id = this.id_id_1.length;
       
    //   for (let k = 0; k < book_id; k++) {
     
    //     var book_id_final = document.querySelector('.click-scroll' + this.id_id_1[k]);
       
    //     book_id_final.addEventListener('click', event => {

    //       // book_id_final.getAttribute("attr" + this.id_id_1[k]);

    //       activatedRouter.navigate(['/product-view', { id: this.id_id_1[k] }]);
    //     });
    //   }
    // }, 2000);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await this.loading.present();

     
 
  }

}


