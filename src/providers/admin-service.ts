import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the AdminService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AdminService {

  constructor(public http: Http) {
    console.log('Hello AdminService Provider');
  }

  addNewEvent(eventName){
   

    firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/events').push({
      eventName : eventName
    }).then((key)=>{

      firebase.database().ref('/events/' + key).set({
        eventName:eventName,
        ownerId : firebase.auth().currentUser.uid
      })

    })

  }

  deleteEvent(eventId){

    firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/events').remove(eventId).then(()=>{
      firebase.database().ref('/events').remove(eventId);
    })

  }

  viewEvent(eventId){
    
  }

  getEvents(){

    var events = [];
    return new Promise(resolve=>{
         firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/events').on('value',function(snapshot){
            snapshot.val().forEach(function(child){
                events.push({
                    key:child.key,
                    value:child.val()
                  });
            })
          
            resolve(events);


          });
      }
    )
  }


}
