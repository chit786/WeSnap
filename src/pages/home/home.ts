import { Component } from '@angular/core';
import { Camera,Device } from 'ionic-native';
import { NavController,ActionSheetController,Platform,NavParams} from 'ionic-angular';
import { PictureService } from '../../providers/picture-service';
import firebase from 'firebase';
import 'whatwg-fetch';
import { AuthData } from '../../providers/auth-data';
import {AccessPage} from '../access-page/access-page';


declare var window: any;
declare var plugins: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  enrolledEvent:any;
  userName : any;
  caption : any;
  

  constructor(public navCtrl: NavController,public navParams: NavParams, public authService : AuthData,public actionSheetCtrl: ActionSheetController, public platform:Platform,
  public pictureService : PictureService) {
    
    // var profile = this.pictureService.checkUserExist(Device.uuid)
    // if(profile){
    //     this.enrolledEvent = profile.event;
    //     this.userName = profile.name
    // }else{
    //   this.logout();
    // }
      
  }


  logout(){
    this.authService.logoutUser().then(()=>{
      this.navCtrl.setRoot(AccessPage);
    });
  }

 
  openImageUploadOption(){
      let actionSheet = this.actionSheetCtrl.create({
      title: 'Load Photo Options',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            console.log('Camera clicked');
            this.doGetPicture(false);
          
          }
        },{
          text: 'Photo & Video Library',
          handler: () => {
            console.log('Archive clicked');
              this.doGetPicture(true);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();


  }

  makeFileIntoBlob(_imagePath) {

    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    if (this.platform.is('android')) {
      return new Promise((resolve, reject) => {
        window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

          fileEntry.file((resFile) => {

            var reader = new FileReader();
            reader.onloadend = (evt: any) => {
              var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
              imgBlob.name = 'sample.jpg';
              resolve(imgBlob);
            };

            reader.onerror = (e) => {
             
              reject(e);
            };

            reader.readAsArrayBuffer(resFile);
          });
        });
      });
    } else {
      return window.fetch(_imagePath).then((_response) => {
        return _response.blob();
      }).then((_blob) => {
        return _blob;
      }).catch((_error) => {
        alert(JSON.stringify(_error.message));
      });
    }
  }

  uploadToFirebase(_imageBlob) {
    //var fileName = 'sample-' + new Date().getTime() + '.jpg';
    var unixTime = Math.round(new Date().getTime()/1000.0);
    var fileName =  unixTime + '.jpg';

    return new Promise((resolve, reject) => {
      var fileRef = firebase.storage().ref('images/' + fileName);

      var uploadTask = fileRef.put(_imageBlob);

      uploadTask.on('state_changed', (_snapshot) => {
     
      }, (_error) => {
        reject(_error);
      }, () => {
        // completion...
        resolve(uploadTask.snapshot);
      });
    });
  }

   saveToDatabaseAssetList(_uploadSnapshot) {
    this.pictureService.updateProfilepic(_uploadSnapshot.downloadURL,Device.uuid,this.caption);

  }

  doGetPicture(isLibrary) {

    let imageSource = (isLibrary ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA);

    // TODO:
    // get picture from camera
    Camera.getPicture( {destinationType: Camera.DestinationType.FILE_URI,
      sourceType: imageSource,
      targetHeight: 640,
      correctOrientation: true,
      saveToPhotoAlbum: true}).then((_imgPath)=>{
       return this.makeFileIntoBlob(_imgPath);
    }).then((_imageBlob) => {
      alert('got image blob ' + _imageBlob);

      // upload the blob
      return this.uploadToFirebase(_imageBlob);
    }).then((_uploadSnapshot: any) => {
      alert('file uploaded successfully  ' + _uploadSnapshot.downloadURL);

      // store reference to storage in database
      return this.saveToDatabaseAssetList(_uploadSnapshot);

    }).then((_uploadSnapshot: any) => {
      alert('file saved to asset catalog successfully  ');
      // this.loadData();
    }, (_error) => {
    
      alert('Error ' + _error.message);
    });



  }

}
