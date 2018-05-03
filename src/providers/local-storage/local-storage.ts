import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let USRKEY = "user";

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
}
