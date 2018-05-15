import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let USRKEY = "user";
//let RECLKEY = "reclamacao";
let RECLDATA = "dados";

@Injectable()
export class LocalStorageProvider {

  
  constructor(public http: HttpClient) {
    console.log('Hello LocalStorageProvider Provider');
  }

  setUserData(user:any){
    console.log(user);
    localStorage.setItem(USRKEY, JSON.stringify(user));
  }

  public getUserData(): any{
    let user:any = JSON.parse(localStorage.getItem(USRKEY));
    if(user==null){
      /**/
      user = {
        uid     : 0,
        token   : '',
        nome    : '',
        imagem  : '', 
        sexo    : '',
        social  : ''
      }
      this.setUserData(user);
      /**/
    }
    return user;
  }

  public cleanUserData(){
    localStorage.removeItem(USRKEY);
  }

  setDataReclamacao(dados:any) {
    console.log(dados);
    localStorage.setItem(RECLDATA, JSON.stringify(dados));
  }

  public getDataReclamacao(): any {
    let reclamacao:any = JSON.parse(localStorage.getItem(RECLDATA));
    if(reclamacao==null){
      /**/
      reclamacao = {}
      this.setDataReclamacao(reclamacao);
      /**/
    }
    return reclamacao;
  }

  public cleanDataReclamacao(){
    localStorage.removeItem(RECLDATA);
  }

  // setReclamacao(reclamacao:any){
  //   console.log(reclamacao);
  //   localStorage.setItem(RECLKEY, JSON.stringify(reclamacao));
  // }
}
