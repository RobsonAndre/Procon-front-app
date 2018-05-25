import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { CadastroProvider } from '../../providers/cadastro/cadastro';
import { LoginPage } from '../login/login';
import { UtilProvider } from '../../providers/util/util';

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
  public cpfValido: any;
  public senhaValida: any;
  public errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public cadastroProvider: CadastroProvider,
    public utilProvider: UtilProvider
  ) {
    this.cadastro = {
      termos: false
    };
  }  

  validaCPF(strCPF) {
    var soma;
    var resto;
    soma = 0;
    //strCPF  = RetiraCaracteresInvalidos(strCPF,11);
    if (strCPF == "00000000000")
      return false;
    for (let i = 1; i <= 9; i++)
      soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11))
      resto = 0;
    if (resto != parseInt(strCPF.substring(9, 10)))
      return false;
    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11))
      resto = 0;
    if (resto != parseInt(strCPF.substring(10, 11)))
      return false;
    return strCPF;
  }

  verificaSenha(senha, validacao) {
    if (senha.valueOf() == validacao.valueOf()) {
      return validacao;
    } else return false;
  }

  public realizaCadastro() {
    this.cpfValido = this.validaCPF(this.cadastro.cpf);
    this.senhaValida = this.verificaSenha(this.cadastro.senha, this.cadastro.senha_validacao);    

    let dadosCadastro = {
      nome: this.cadastro.nome.trim(),
      cpf: this.cpfValido,
      email: this.cadastro.email,
      senha: this.cadastro.senha,
      //senha_validacao: this.senhaValida ,
      termo: this.verificarTermo(this.cadastro.termo)
    }

    // if(!this.cpfValido) {
    //   this.toastErro("CPF em branco ou inválido.")
    // } else if (!this.senhaValida) {
    //   this.toastErro("Senha em branco ou inválida, a senha deve conter de 8 a 15 caracteres.")
    // } else if(!this.cpfValido && !this.cpfValido) {
    //   this.toastErro("Os campos CPF e Confirmação de senha estão inválidos.")
    // } else {
    //   console.log("dados",dadosCadastro);
    //   this.verificaCadastro(dadosCadastro);      
    // }

    this.verificaCadastro(dadosCadastro);

    console.log('a', dadosCadastro);    
  }

  verificarTermo(termo) {
    if(termo == true) {
      return 1;
    } else return 0;
  }

  verificaCadastro(dadosCadastro) {
    this.cadastroProvider.saveCadastro(dadosCadastro).subscribe(
      data => {
        let obj: any = data;
        if (obj.success) {
          this.dismiss();
          this.utilProvider.showToast("Cadastro realizado com sucesso!");
          this.navCtrl.setRoot(LoginPage);
        } else {
          this.toastErro(obj.info);
        }
        console.log('suc: ' + JSON.stringify(obj));
      }, error => {
        console.log('err: ' + JSON.stringify(error));
      });
  }

  toastErro(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'top',
      showCloseButton: true,
      dismissOnPageChange: true,
      cssClass: 'error',
      closeButtonText: 'X'
    });
    toast.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

}
