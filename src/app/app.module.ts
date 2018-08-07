import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PrincipalPage } from '../pages/principal/principal';
import { EscanearPage } from '../pages/escanear/escanear';
import { ResultadosPage } from '../pages/resultados/resultados';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { AcercaDePage } from '../pages/acerca-de/acerca-de';
import { InicioPage } from '../pages/inicio/inicio';

import { HttpClientModule } from '@angular/common/http';
import {LottieAnimationViewModule} from 'ng-lottie';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from "@ionic-native/image-picker";
import { Base64 } from '@ionic-native/base64';
@NgModule({
  declarations: [
    MyApp,
    PrincipalPage,
    EscanearPage,
    ResultadosPage,
    TabsControllerPage,
    AcercaDePage,
    InicioPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,LottieAnimationViewModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PrincipalPage,
    EscanearPage,
    ResultadosPage,
    TabsControllerPage,
    AcercaDePage,
    InicioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,Camera,ImagePicker,Base64,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}