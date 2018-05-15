import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

/**
 * Generated class for the ReclamacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reclamacao',
  templateUrl: 'reclamacao.html',
})
export class ReclamacaoPage {

  public reclamacao: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public localStorageProvider: LocalStorageProvider
  ) {
    this.reclamacao = {};
  }

  public preencherCampos() {
    let dadosReclamacao = {
      // nome: this.limparString(this.cadastro.nome),
      // cpf: this.validaCPF(this.cadastro.cpf),
      // email: this.limparString(this.cadastro.email),
      // senha: this.cadastro.senha,
      // senha_validacao: this.verificaSenha(this.cadastro.senha, this.cadastro.senha_validacao),
      // termos: this.cadastro.termos
    }

    this.localStorageProvider.setDataReclamacao(this.reclamacao);
    //console.log(this.reclamacao);
    this.dismissWithData(this.reclamacao);
  }

  dismissWithData(data) {
    this.viewCtrl.dismiss(data);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReclamacaoPage');
  }

}
