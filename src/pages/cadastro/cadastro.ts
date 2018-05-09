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

  public cadastro: any;

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

  validaCPF(cpf) {
    let numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
      return false;
    for (i = 0; i < cpf.length - 1; i++)
      if (cpf.charAt(i) != cpf.charAt(i + 1)) {
        digitos_iguais = 0;
        break;
      }
    if (!digitos_iguais) {
      numeros = cpf.substring(0, 9);
      digitos = cpf.substring(9);
      soma = 0;
      for (i = 10; i > 1; i--)
        soma += numeros.charAt(10 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0))
        return false;
      numeros = cpf.substring(0, 10);
      soma = 0;
      for (i = 11; i > 1; i--)
        soma += numeros.charAt(11 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1))
        return false;
      return true;
    }
    else
      return false;
  }

  verificaSenha(senha, validacao) {
    if(senha.valueOf() == validacao.valueOf()) {
      return validacao;
    } else return false;
  }

  public realizaCadastro() {
    let dadosCadastro = {
      nome: this.limparString(this.cadastro.nome),
      cpf: this.validaCPF(this.cadastro.cpf),
      email: this.limparString(this.cadastro.email),
      senha: this.cadastro.senha,
      senha_validacao: this.verificaSenha(this.cadastro.senha, this.cadastro.senha_validacao),
      termos: this.cadastro.termos
    }

    console.log(this.cadastro);
    console.log('a', dadosCadastro);
    this.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

}
