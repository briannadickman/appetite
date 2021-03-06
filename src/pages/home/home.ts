import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  foods: FirebaseListObservable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public app: App,
    db: AngularFireDatabase) {
      this.foods = db.list('/foods');
}

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email) {
        this.toast.create({
          message: 'Welcome back!',
          duration: 3000
        }).present();
      } else {
        this.toast.create({
          message: 'Unable to verify login credentials. Please try again.',
          duration: 3000
        }).present();
      }

    });
  }

  signOut() {
    console.log('Signing out');
    this.navCtrl.setRoot(LoginPage);
    // const root = this.app.getActiveNavs();
    // this.root[0].setRoot(LoginPage);
  }

  deleteItem(food) {
    console.log(food);
    console.log(food.title + ' in cart. Delete from view.');
    this.foods.remove(food);
  }

  addFood(){
  let prompt = this.alertCtrl.create({
    title: 'Add Item to List',
    inputs: [
      {
        name: 'name',
        placeholder: 'I need...'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.foods.push({
            title: data.name
          });
        }
      }
    ]
  });
  prompt.present();
}

}
