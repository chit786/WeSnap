import { Component,NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen,Device } from 'ionic-native';
import firebase from 'firebase';
import { AccessPage } from '../pages/access-page/access-page';
import { UserPage } from '../pages/user/user';



@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  rootPage :any ;
  zone: NgZone;


  constructor(platform: Platform) {
     this.zone = new NgZone({});
    firebase.initializeApp({
       apiKey: "AIzaSyA4MTCUfxQyBRMtOSmkx2HN107uEvS774o",
       authDomain: "wesnap-d06fb.firebaseapp.com",
       databaseURL: "https://wesnap-d06fb.firebaseio.com",
       storageBucket: "wesnap-d06fb.appspot.com",
       messagingSenderId: "269767181225"
    });

     firebase.auth().onAuthStateChanged((user) => {
      //this.zone.run( () => {
        if (!user) {
          this.rootPage = AccessPage;
          // unsubscribe();
        } else { 
          this.rootPage = UserPage;
          // unsubscribe();
        }
      //});     
    });

    platform.ready().then(() => {
     
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}


