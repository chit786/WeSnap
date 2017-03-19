import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AdminLoginPage } from '../pages/admin-login/admin-login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { HomePage } from '../pages/home/home';
import { AdminHomePage } from '../pages/admin-home/admin-home';
import { UserPage } from '../pages/user/user';
import { UserUploadsPage } from '../pages/user-uploads/user-uploads';
import { AccessPage } from '../pages/access-page/access-page';
import { PictureService } from '../providers/picture-service';
import { CreateEventPage } from '../pages/create-event/create-event';
import { General } from '../providers/general';
import { AuthData } from '../providers/auth-data';
import { AdminService } from '../providers/admin-service';
import firebase from "firebase";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AccessPage,
    UserPage,
    UserUploadsPage,
    CreateEventPage,
    AdminLoginPage,
    ResetPasswordPage,
    SignUpPage,
    AdminHomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AccessPage,
    UserPage,
    UserUploadsPage,
    CreateEventPage,
     AdminLoginPage,
    ResetPasswordPage,
    SignUpPage,
    AdminHomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},PictureService,General,AuthData,AdminService]
})
export class AppModule {}
