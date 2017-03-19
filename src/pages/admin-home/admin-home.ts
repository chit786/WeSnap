import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { AdminService } from '../../providers/admin-service';
import {AccessPage} from '../access-page/access-page';

/*
  Generated class for the AdminHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html'
})
export class AdminHomePage {
  events : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public adminServ :AdminService, public authService : AuthData, public alertCtrl : AlertController) {}

  ionViewDidLoad() {
    this.getEvents;
  }

  addEvent(){
    let alert = this.alertCtrl.create({
            message: "Enter Event Name",
            inputs: [
                    {
                      name: 'title',
                      placeholder: 'Title'
                    },
            ],
            buttons: [
              {
                text: "Ok",
                handler: data => {
                  console.log(data.title);
                  this.adminServ.addNewEvent(data.title);
                }
              },
              {
                text: "Cancel",
                role: 'cancel'
              }
            ]
          });
          alert.present();          

  }

  getEvents(){

    this.adminServ.getEvents().then((_events)=>{
      this.events = _events;
    })

  }

  deleteEvents(index){

    this.events.forEach(function(_event){
      




    })

  }

}
