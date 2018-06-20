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


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

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
    SplashScreen,Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}