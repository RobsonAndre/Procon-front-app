import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { UtilProvider } from '../../providers/util/util';
import { HomePage } from '../home/home';

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
  public user:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public loginProvider: LoginProvider,
    public localStorageProvider: LocalStorageProvider
  ) {
    //Obj login
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
          this.user.uid    = obj.uid;
          this.user.token  = obj.token;
          this.user.nome   = obj.nome;
          this.user.imagem = obj.imagem;
          this.user.sexo   = obj.sexo;
          this.user.social = obj.social;
          
          //gravando no localStorage 
          this.localStorageProvider.setUserData(this.user);
          this.navCtrl.setRoot(HomePage);
        }
        console.log('suc: ' + JSON.stringify(obj));
      }, error => {
        console.log('err: ' + JSON.stringify(error));
      });
  }

  public verificaUser(){
    this.user = this.localStorageProvider.getUserData();
    this.utilProvider.fechaLoading();
    if(this.user.uid!=0){
      this.navCtrl.setRoot(HomePage);
    }
  }

  ionViewDidEnter() {

    this.utilProvider.abreLoading();
    this.verificaUser();
    console.log('ionViewDidLoad LoginPage');

  }

}