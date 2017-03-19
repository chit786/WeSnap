import { Component } from '@angular/core';
import { NavController, NavParams,Platform,AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Device } from 'ionic-native';
import {HomePage} from '../home/home';
import {UserPage} from '../user/user';
import {AdminLoginPage} from '../admin-login/admin-login';
import {CreateEventPage} from '../create-event/create-event';
import { General } from '../../providers/general';

/*
  Generated class for the AccessPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-access-page',
  templateUrl: 'access-page.html'
})
export class AccessPage {

  public accessForm;
  submitAttempt = false;
  constructor(public navCtrl: NavController,public generalService : General,public alertCtrl: AlertController, public navParams: NavParams, public formBuilder: FormBuilder,public platform:Platform) {
      this.accessForm = formBuilder.group({
        event: ['', Validators.compose([Validators.required])],
        yourname: ['', Validators.compose([Validators.required])]
      });
  }

  ionViewDidLoad() {
        

  }


  openEvent(formData){
    console.log("here");
    this.submitAttempt = true;
   


      if(this.generalService.isEventExist(formData.event)){
            this.navCtrl.setRoot(UserPage);
      }else{
          let alert = this.alertCtrl.create({
          message: "Invalid Event Name",
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
          alert.present();


        }
  

  }


  gotoLogin(){

    this.navCtrl.push(AdminLoginPage).catch(()=>{
      
    });
  }

}
