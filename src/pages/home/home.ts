import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

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
  }

  deleteItem(food) {
    console.log(food);
    console.log(food.title + ' in cart. Delete from view.');
    this.foods.remove(food);
  }

  addFood(){
  let prompt = this.alertCtrl.create({
    title: 'Item Name',
    message: "Enter an item to add to your list.",
    inputs: [
      {
        name: 'name',
        placeholder: 'Name'
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
