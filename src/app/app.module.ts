import { NgModule, ErrorHandler } from '@angular/core';
// 引入浏览器模块
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CropperPage } from '../pages/cropper/cropper'
import { UserCenterPage } from '../pages/userCenter/userCenter'
//@import


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    CropperPage,
    UserCenterPage//@register
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    CropperPage,
    UserCenterPage//@register
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
