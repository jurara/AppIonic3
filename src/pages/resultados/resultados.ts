import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { EscanearPage } from '../escanear/escanear';

@Component({
  selector: 'page-resultados',
  templateUrl: 'resultados.html'
})
export class ResultadosPage {

  contenedor:any =[];
  result: any = [];
  stats:any = {"tam_muestra":0,"prome_enf":1,"nivel_sev":2}
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var respuesta_serv = navParams.get("res");
    var diag = respuesta_serv.diagnostico;
    this.contenedor = respuesta_serv.diagnostico;
    
    var sum_p=0;
    for(var i = 0; i<diag.length;i++){
      sum_p+=diag[i].porcentaje_enf; // suma de porcentajes
    }
    var prome_porc = sum_p/diag.length; // calculo promedio de porcentajes
    console.log(sum_p+" "+diag.length);
    this.stats.prome_enf=prome_porc;
    this.stats.tam_muestra=respuesta_serv.tam_muestra;
    //calculo de nivel de severidad
    var sev = -1;
    // 0=sano, 1=25,2=50, 3=75 y 4=100
    if(prome_porc === 0){ sev=0; }
    if(prome_porc > 0 && prome_porc<=25){ sev=1; }
    if(prome_porc > 25 && prome_porc<=75 ){ sev=2; }
    if(prome_porc > 75 && prome_porc<=99 ){ sev=3; }
    if(prome_porc === 100){ sev=4; }

    this.stats.nivel_sev=sev;
  } // constructor

  goToEscanear(params){
    if (!params) params = {};
    this.navCtrl.push(EscanearPage);
  }
  
}
