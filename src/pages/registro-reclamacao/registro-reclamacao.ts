import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';

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
    public utilProvider: UtilProvider
  ) {
    this.reclamacao = {};
    this.estabelecimentos = [
      { tipo: 0, descricao: "Selecione o estabelecimento" },
      { tipo: 1, descricao: "Estabelecimento financeiro/banco" },
      { tipo: 2, descricao: "Cartório" },
      { tipo: 999, descricao: "Outro" }
    ];
    this.reclamacoes = [
      { tipo: 0, descricao: "Selecione a Reclamação" },
      { tipo: 1, descricao: "Tempo de espera da fila de atendimento" },
      { tipo: 2, descricao: "Produto vencido" },
      { tipo: 999, descricao: "Outro" }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroReclamacaoPage');
  }

  public carregarOpcao(opcao: any) {
    this.utilProvider.abreLoading();
    if (opcao) {
      console.log(this.reclamacao);
    }
    this.exibir();
  }

  public exibir() {
    this.utilProvider.fechaLoading();
    console.log("Novo select");
  }

}
