import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController, AlertController  } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { SignUpPage } from '../sign-up/sign-up';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { UserPage } from '../user/user';

/*
  Generated class for the AdminLogin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin-login',
  templateUrl: 'admin-login.html'
})
export class AdminLoginPage {

  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public nav: NavController, public authData: AuthData, 
    public formBuilder: FormBuilder,public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController) {


      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

    }

  ionViewDidLoad() {
    
  }
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }
  loginUser(){
    debugger;
  this.submitAttempt = true;

  if (!this.loginForm.valid){
    
  } else {

    this.authData.createTimeout(5000).then(()=>{
       this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
            //this.loading.dismiss().catch(() => {});
          //this.nav.setRoot(UserPage);
          //update the deviceID where the user is currently loggedIN
          // this.nav.setRoot(UserPage);
          this.nav.setRoot(UserPage);
          // let loader = this.loadingCtrl.create({
          //   dismissOnPageChange : true
          // });
          // loader.present().then(() => {
            
          //   this.nav.setRoot(UserPage);
          // });

          
        }, error => {
        // this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
        // });
        });
    });
   

  this.loading = this.loadingCtrl.create({
    dismissOnPageChange: true,
  });
  this.loading.present();
  }
}

  goToSignup(){
  this.nav.push(SignUpPage);
  }

  goToResetPassword(){
  this.nav.push(ResetPasswordPage);
  }

}
