import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the AddFoodPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html',
})
export class AddFoodPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  addNewFood(food) {
    console.log('Adding ' + food + ' to list.');
    this.navCtrl.push(HomePage);
  }

}
