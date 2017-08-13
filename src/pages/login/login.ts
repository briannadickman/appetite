import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(
    private AFauth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  async login(user: User) {
    const result = this.AFauth.auth.signInWithEmailAndPassword(user.email, user.password);
    if(result) {
      this.navCtrl.setRoot('HomePage');
    }

  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

}
