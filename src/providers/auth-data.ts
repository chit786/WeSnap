import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';




/*
  Generated class for the AuthData provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthData {
  // Here we declare the variables we'll be using.
  public fireAuth: any;
  public userProfile: any;

 
  constructor(public http: Http) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');
  }

  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then(()=>{
      this.createTimeout(2000);
    });
  }

  signupUser(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((newUser) => {
    
        this.userProfile.child(newUser.uid).set({email: email, admin: true});
       
      }).then(()=>{
      this.createTimeout(1000);
    });;
  }

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  createTimeout(timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(null),timeout)
        })
    }

  logoutUser(): any {
    //  return new Promise((resolve, reject) => {
    //   resolve(this.fireAuth.signOut().then(()=>{
    //    this.createTimeout(1000);
    // }))
    //  });
    return firebase.auth().signOut();
  }

  checkUserAdmin():any{
    
      return firebase.database().ref('/userProfile/' + firebase.auth().currentUser.uid + '/admin');

  }

}