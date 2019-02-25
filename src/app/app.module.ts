import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { TravelRequestsPage } from '../pages/travelRequests/travelRequests';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserServiceProvider } from '../providers/user-service/user-service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InsertTravelPage } from '../pages/insertTravel/insertTravel';
import { UpdateTravelPage } from '../pages/updateTravel/updateTravel';
import { LoginPage } from '../pages/login/login';
import { RegisterUserPage } from '../pages/registerUser/registerUser';

@NgModule({
  declarations: [
    MyApp,
    TravelRequestsPage,
    ContactPage,
    HomePage,
    TabsPage,
    InsertTravelPage,
    UpdateTravelPage,
    LoginPage,
    RegisterUserPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TravelRequestsPage,
    ContactPage,
    HomePage,
    TabsPage,
    InsertTravelPage,
    UpdateTravelPage,
    LoginPage,
    RegisterUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
