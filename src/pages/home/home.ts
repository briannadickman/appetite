import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    private AFauth: AngularFireAuth,
    private toast: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.AFauth.authState.subscribe(data => {
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

  keepItem(item) {
    console.log(item);
    console.log('Keeping ' + item + '! Send to Eats list!');
  }

  searchYelpToResults(foodChoices) {
    //Search Yelp
    console.log('Searching Yelp');
  }

}
