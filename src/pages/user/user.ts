import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {AccessPage} from '../access-page/access-page';
import {UserUploadsPage} from '../user-uploads/user-uploads';
import {AdminHomePage} from '../admin-home/admin-home';
import firebase from 'firebase';
import { AuthData } from '../../providers/auth-data';
/*
  Generated class for the User page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.*/

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  title:any;
  home : any = HomePage;
  adminhome : any = AdminHomePage;
  useruploads : any = UserUploadsPage;
  showAdmin : any = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : AuthData) {
      this.showAdmin = authService.checkUserAdmin();
      this.title = "Home Page";
      console.log("check userpage");
      
  }

  ionViewDidLoad() {


  
  }

  logout(){
    this.authService.logoutUser().then(()=>{
      this.navCtrl.setRoot(AccessPage);
    });
  }


}
