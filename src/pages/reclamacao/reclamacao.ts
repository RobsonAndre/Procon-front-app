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
    public viewCtrl: ViewController
  ) {
    this.reclamacao = {};
  }

  public preencherCampos() {
    // let dadosReclamacao = {
    //   banco: this.reclamacao.banco,
    //   agencia: this.reclamacao.agencia,
    //   data: this.reclamacao.data,
    //   hora: this.substituirString(this.reclamacao.hora),
    //   espera: this.reclamacao.espera,
    //   atendido: this.reclamacao.atendido
    //}

    //this.localStorageProvider.setDataReclamacao(this.reclamacao);
    //console.log(this.reclamacao);
    //console.log("dados",dadosReclamacao);
    this.dismissWithData(this.reclamacao);
  }

  substituirString(v) {
    return v.replace(/[\. ,:-]+/g, "-");
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
