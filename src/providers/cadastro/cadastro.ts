import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CadastroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CadastroProvider {

  //End Points
  //private baseLoginPath      = "http://papiroweb.com.br/integra/login/";
  //private baseTokenPath      = "http://papiroweb.com.br/integra/token/";
  private baseCadastroPath      = "http://papiroweb.com.br/integra/cadastro/";

  constructor(public http: HttpClient) {
    console.log('Hello CadastroProvider Provider');
  }

  saveCadastro(cadastro) {
        
    let action = 1;
    return this.http.get(this.baseCadastroPath+`?action=${action}&nome=${cadastro.nome}&cpf=${cadastro.cpf}&email=${cadastro.email}&senha=${cadastro.senha}&termo=${cadastro.termo}`)
    
  }

}
