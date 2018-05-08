import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public cadastro : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController
  ) {
    this.cadastro = {
      termos: false
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  limparString(v) {
    return v.replace(/[\. ,:-]+/g, "");
  }

  public realizaCadastro() {
    let dadosCadastro = {
      nome: this.limparString(this.cadastro.nome),
      cpf: this.cadastro.cpf,
      email: this.limparString(this.cadastro.email),
      senha: this.cadastro.senha,
      senha_validacao: this.cadastro.senha_validacao,
      termos: this.cadastro.termos
    }

    console.log(this.cadastro);
    console.log('a',dadosCadastro);
    this.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

}
