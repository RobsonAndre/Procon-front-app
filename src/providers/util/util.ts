import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {
  
  public loader;
  public toastDuracao : number = 2000;
  public toastPosicao : string = 'top';
  
  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    console.log('UtilProvider Ok');
  }

  //Loading
  public abreLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    this.loader.present();
  }

  public fechaLoading() {
    this.loader.dismiss();
  }

  //Toast
  public showToast(msg: string) {

    let toast = this.toastCtrl.create({
      message: msg,
      duration: this.toastDuracao,
      position: this.toastPosicao
    });

    toast.present(toast);
  }

}