import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  //End Points
  private baseLoginPath      = "http://papiroweb.com.br/integra/login/";
  private baseTokenPath      = "http://papiroweb.com.br/integra/token/";

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }

  validaLogin(email, senha) {
    
    let action = 1;
    return this.http.get(this.baseLoginPath+`?action=${action}&email=${email}&senha=${senha}&`)

  }
}
