import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
/*
  Generated class for the PictureService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PictureService {
  userProfile : any;
  adminRef : any;

  constructor(public http: Http) {
    this.userProfile = firebase.database().ref('/userProfile')
    this.adminRef = firebase.database().ref('/pendingPics')
    
  }

  updateProfilepic(picUpload: string,deviceid:string,caption:string): any {
    let item= {
      pic: picUpload,
      caption:caption,
      isApproved:false
    }
     return this.userProfile.child(deviceid + '/pics').push(item).then((key)=>{
        this.adminRef.child(key).set(item)
     });
  }

  checkUserExist(deviceid : string) : any{
     this.userProfile.child(deviceid).once('value',function(snapshot){

       if(snapshot.val()){
         return true;
       }else{
         return false;
       }
     })

  }

  getEnrolledEvent(deviceid : string) : any{
      //first check if event exist then add that event to current requesting userProfile

      this.userProfile.child(deviceid + '/enrolledEvent').on('value',function(snapshot){
          if(snapshot.val().event){
            return snapshot.val();
          }else{
            return false;
          }

      })


  }

  setEnrolledEvent(deviceid : string, eventName : string, name: string) : any{
    let user = {
      event:eventName,
      name:name
    }

     this.userProfile.child(deviceid + '/enrolledEvent').set(user);

  }

  deleteEnrolledEvent(deviceid : string) : any{
    
     this.userProfile.child(deviceid + '/enrolledEvent/event').set(null);

  }

}
