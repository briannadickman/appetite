import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html',
})
export class AddFoodPage {

  constructor(
    private database: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  foodItemRef$: FirebaseListObservable<food[]>

  addNewFood(food) {
    console.log('Adding ' + food + ' to list.');
    this.foodItemRef$.push(food);
    this.navCtrl.push(HomePage);
  }

}
