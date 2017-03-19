import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
/*
  Generated class for the General provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class General {

  userProfile : any;
  events : any;
  constructor(public http: Http) {
    this.userProfile = firebase.database().ref('/accessIDs');
    this.events = firebase.database().ref('/events')
  }

  checkAccess(deviceId){
    return new Promise((resolve)=>{
       this.userProfile.child(deviceId).once('value',function(snapshot){

        if(snapshot.role=="admin"){
          resolve(snapshot.role);
        }else{
          resolve("NA");
        }

    })
    })
   
    
  }

  isEventExist(eventName:string):any{
       return new Promise((resolve)=>{
       this.events.once('value',function(snapshot){

        if(snapshot.val()){
          snapshot.foreach(function(childsnapshot){

            if(childsnapshot.name==eventName){
              resolve(childsnapshot.owner)
            }
          })

        }

    })
    })

    
  }


}
