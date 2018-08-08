import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ResultadosPage } from '../resultados/resultados';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import { ImagePicker } from "@ionic-native/image-picker";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LottieAnimationViewModule } from 'ng-lottie';
import { Base64 } from "@ionic-native/base64";
import { LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-escanear',
  templateUrl: 'escanear.html'
})
export class EscanearPage {
  
public ocultar:boolean=false
  mifoto:any;
  result:any=[];
  vectorbase:any=[];
  data:Observable<any>;
  lottieConfig:any
  lottieConfig2:any
  lottieConfig3:any
  lottieConfig4:any
  photos:any=[];
  images: any = [];

  constructor(public navCtrl: NavController,private camera:Camera, public http:HttpClient,public mytoast:ToastController
    ,public imagePicker:ImagePicker,private base64: Base64,public loadingController: LoadingController) {//
      

      LottieAnimationViewModule.forRoot()
      this.lottieConfig = {
        path: 'assets/foto_icon_.json',
       autoplay: true,
        loop: true
      }// camara
      this.lottieConfig2= {
        
        path:'assets/file_error.json',
        autoplay: true,
        loop: true
      }//no poner
      this.lottieConfig3= {
      
        path:'assets/cloud_upload.json',
        autoplay: true,
        loop: true
      }//imagen de enviarioni

      this.lottieConfig4= {
      
        path:'assets/layers.json',
        autoplay: true,
        loop: true
      }//json de obtener foto


  }
  goToResultados(params){
    if (!params) params = {};
    this.navCtrl.push(ResultadosPage);
  }

  tomarfoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum:true,
      targetHeight:480,
      targetWidth:480,
      allowEdit:true,
      
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.toast("se tomo foto","1");
     this.mifoto ='data:image/jpeg;base64,'+ imageData;//
     this.photos.push(this.mifoto);
    }, (err) => {
      this.toast("error verifica la camara","1");
     // Handle error
    });
  }


  obtenerfoto(){
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false,
      targetHeight:480,
      targetWidth:480
    }
    
    this.imagePicker.getPictures(options).then((imageData) => {
     for(var i=0;i<imageData.length;i++){
       this.toast("cargando imagen ",i+1);
       this.mifoto = 'data:image/jpeg;base64,' + imageData[i];

       this.images.push(this.mifoto);
     }
     this.mifoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     this.toast("eroor:","no se pudo obtener img");
     this.aparecer();
    });
  }//termina obtener foto


  

  aparecer(){
this.ocultar=!this.ocultar


  }


  
  

  postfoto(){
    let loader = this.loadingController.create({
      content: "Enviando imagenes, Favor de esperar..."
    });  
    loader.present();
    var url='https://2cc77abb.ngrok.io/analizarMuestra';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    let body = {
      hojas:[this.vectorbase]
    };

    this.http.post(url, JSON.stringify(body), {headers: headers})
      .map(data => {
        loader.dismiss();
        this.vectorbase=[];
      this.images=[];
        this.toast("",data);
        
      })
      .subscribe(data => {
        
        console.log(data);
      });
      
      
  }

  /////////////////////////////////////////////////////////////////////////////////
  getPictures2(){ 
    let options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false,
      targetHeight:480,
      targetWidth:480,
      allowEdit:true
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.images.push(results[i]);  
        this.mifoto = results[i];
          this.base64.encodeFile(results[i]).then((base64File: string) => {
            this.vectorbase.push(base64File);
            
          }, (err) => {
            console.log(err);
          });
      }
    }, (err) => { console.log(err); });
  }

///////////////////////////////////////////////////////////////////////////////////////////////



toast(msg,t){
let toas=this.mytoast.create({
duration:3000,
message:msg+" "+t,
position:"Button"
})
toas.present();
}

}
