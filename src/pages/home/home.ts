import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
// import { AddFoodPage } from '../add-food/add-food';
import {AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

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
          message: 'Welcome back, ${data.email}',
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

  deleteItem() {
    console.log('Passing on food. Delete from view.');
  }


  // navigateToAddFood() {
  //   //Search Yelp
  //   console.log('Going to AddFoodPage');
  //   this.navCtrl.push(AddFoodPage);
  // }

  addFood(){
  let prompt = this.alertCtrl.create({
    title: 'Food Name',
    message: "Enter a food to add to your list.",
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
