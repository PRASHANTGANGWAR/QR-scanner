import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { HttpModule } from '@angular/http';
import { PageScanPage } from '../pages/page-scan/page-scan';
import { MyApp } from './app.component';
import { HomePage} from '../pages/home/home';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { AlertProvider } from '../providers/alert/alert';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PageScanPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PageScanPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Toast,
    DataServiceProvider,
    AlertProvider
  ]
})
export class AppModule {}
