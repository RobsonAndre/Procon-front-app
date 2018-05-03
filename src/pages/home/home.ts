import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public utilProvider: UtilProvider
  ) {

  }


  public abrePage(page, options={}){
    
    console.log(page);
    //this.navCtrl.push(page,options);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
