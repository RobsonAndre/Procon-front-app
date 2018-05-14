import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { RegistroReclamacaoProvider } from '../../providers/registro-reclamacao/registro-reclamacao';

/**
 * Generated class for the RegistroReclamacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro-reclamacao',
  templateUrl: 'registro-reclamacao.html',
})
export class RegistroReclamacaoPage {

  public reclamacao: any;
  public estabelecimentos: any;
  public reclamacoes: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public localStorageProvider: LocalStorageProvider,
    public registroReclamacaoProvider: RegistroReclamacaoProvider
  ) {
    this.reclamacao = {};    
    this.carregarEstabelecimentos();
  }

  //ionViewDidEnter
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroReclamacaoPage');
  }

  carregarEstabelecimentos() {
    this.registroReclamacaoProvider.getEstabelecimentos().subscribe(
      data => {
        let obj: any = data;
        if(obj.success) {
          this.estabelecimentos = obj.results;
        } 
      }
    )
  }

  carregarReclamacoes(rec) {
    this.registroReclamacaoProvider.getReclamacoes(rec).subscribe(
      data => {
        let obj: any = data;
        if(obj.success) {
          this.reclamacoes = obj.results.list;
        } 
      }
    )
  }

  public carregarOpcao(opcao: any) {
    this.utilProvider.abreLoading();
    console.log(this.reclamacao);
    if (this.reclamacao.estabelecimento) {
      this.carregarReclamacoes(this.reclamacao.estabelecimento); 
    }
    this.utilProvider.fechaLoading();
  }

}
