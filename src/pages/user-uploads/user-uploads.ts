import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';

/*
  Generated class for the UserUploads page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-uploads',
  templateUrl: 'user-uploads.html'
})
export class UserUploadsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : AuthData) {}

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserUploadsPage');
  }

  // logout(){
  //   this.authService.logoutUser();
  // }
  

}
