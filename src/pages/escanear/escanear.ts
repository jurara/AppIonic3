import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ResultadosPage } from '../resultados/resultados';


import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import { ImagePicker } from "@ionic-native/image-picker";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'page-escanear',
  templateUrl: 'escanear.html'
})
export class EscanearPage {
public ocultar:boolean=false
  mifoto:any;
  result:any=[];
  data:Observable<any>;
  constructor(public navCtrl: NavController,private camera:Camera, public http:HttpClient,public mytoast:ToastController
    ,public imagePicker:ImagePicker) {//
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
      targetHeight:400,
      targetWidth:200,
      allowEdit:true,
      
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.toast("se tomo foto","1");
     this.mifoto ='data:image/jpeg;base64,'+ imageData;//
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
      targetHeight:400,
      targetWidth:200
    }
    
    this.imagePicker.getPictures(options).then((imageData) => {
     for(var i=0;i<imageData.length;i++){
       this.toast("cargando imagen ",i+1);
       
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
    var url='https://cc65943d.ngrok.io/analizarMuestra';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  

    let body = {
      hojas:this.mifoto
    };

    this.http.post(url, JSON.stringify(body), {headers: headers})
      .subscribe(data => {
        console.log(data);
      });
  }

 toast(msg,t){
let toas=this.mytoast.create({
duration:3000,
message:msg+" "+t,
position:"Button"
})
toas.present();
}

}
