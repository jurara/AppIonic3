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
import { AlertController } from 'ionic-angular';

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
  resultados: any = [];
  contenedor:any = [[]];
  contenedorvisual:any=[[]];

  constructor(public navCtrl: NavController,private camera:Camera, public http:HttpClient,public mytoast:ToastController
    ,public imagePicker:ImagePicker,private base64: Base64,public loadingController: LoadingController,private alertCtrl: AlertController) {//
      

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
    this.navCtrl.push(ResultadosPage,{res:this.resultados});
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
     this.images.push(this.mifoto);
     this.vectorbase.push(this.mifoto);
     this.contenedor[this.contenedor.length-1].push(this.mifoto); // Agrega imagenes al arbol mas nuevo
     this.contenedorvisual[this.contenedorvisual.length-1].push(this.mifoto);
    }, (err) => {
      this.toast("Error comunicando a la Camara","");
     // Handle error
    });
  }

  agregarArbol(){
    if (this.contenedor[this.contenedor.length-1].length>0){ //Si no hay ninguna imagen capturada no crea arbol
    this.contenedor.push([]); // Nuevo arreglo de arreglos; Nuevo arbol
    this.contenedorvisual.push([]);
    //this.toast(this.contenedor.length+"<- ->"+this.contenedor[this.contenedor.length-2].length,"");
    }
    else {
      this.toast("Agregue hojas al arbol actual antes de agregar otro","");
    }
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
     this.toast("error:","no se pudo obtener img");
     this.aparecer();
    });
  }//termina obtener foto


  

  aparecer(){
this.ocultar=!this.ocultar


  }


  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Seleccione imágenes',
      subTitle: 'Por favor, seleccione/capture una o más imágenes para el análisis',
      buttons: ['   Ok   ']
    });
    alert.present();
  }
  

  postfoto(){
    if(this.vectorbase.length==0){
      this.presentAlert();
    }else{
    let loader = this.loadingController.create({
      content: "Enviando imagenes, Favor de esperar..."
    });  
    loader.present();
    var url='http://167.99.170.36/analizarMuestra';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    let body = {
      hojas: this.contenedor //[this.vectorbase]
    };

    this.http.post(url, JSON.stringify(body), {headers: headers})
      .map(data => {
        loader.dismiss();
        this.vectorbase=[];
      this.images=[];
        
        this.resultados=data;
        this.goToResultados({});
      })
      .subscribe(data => {
        
        console.log(data);
      });
      
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  getPictures2(){ 
    let options = {
      quality: 100,
      width: 480,
	    height: 480
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.images.push(results[i]);  
        this.contenedorvisual[this.contenedorvisual.length-1].push(results[i]);
        this.mifoto = results[i];
          this.base64.encodeFile(results[i]).then((base64File: string) => {
            this.vectorbase.push(base64File);

            this.contenedor[this.contenedor.length-1].push(base64File);
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
