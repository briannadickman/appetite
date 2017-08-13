import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(
    private AFauth: AngularFireAuth,
    private toast: ToastController,
    public navCtrl: NavController) {
  }

  ionViewWillLoad() {
    this.AFauth.authState.subscribe(data => {
      if(data.email){
        this.toast.create({
          message: 'Welcome back ${data.email}',
          duration: 3000,
        }).present();
      } else {
        this.toast.create({
          message: 'Not a valid username & password',
          duration: 3000,
        }).present();
      }
    });
  }

  public swipe: number = 0;
    swipeEvent(e) {
      this.swipe++
     }
}
