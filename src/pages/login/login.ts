import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public login:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loginProvider: LoginProvider,
  ) {
    this.login = {
      email: 'robson_x@yahoo.com.br',
      senha: 'senha@12'
    }
  }

  public validalogin(){
    this.loginProvider.validaLogin(this.login.email,this.login.senha).subscribe(
      data => {
        let obj: any = data;
        if (obj.success) {
          //login ok!
        }
        console.log('suc: ' + JSON.stringify(obj));
      }, error => {
        console.log('err: ' + JSON.stringify(error));
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
