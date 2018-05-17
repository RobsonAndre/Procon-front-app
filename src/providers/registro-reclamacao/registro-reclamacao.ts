import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RegistroReclamacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegistroReclamacaoProvider {

  //End Points
  //private baseLoginPath      = "http://papiroweb.com.br/integra/login/";
  //private baseTokenPath      = "http://papiroweb.com.br/integra/token/";
  private baseEstabelecimentoPath = "http://papiroweb.com.br/integra/estabelecimentos/";
  private baseReclamacoesPath = "http://papiroweb.com.br/integra/reclamacoes/";

  constructor(public http: HttpClient) {
    console.log('Hello RegistroReclamacaoProvider Provider');
  }

  getEstabelecimentos() {

    let action = 1;
    let token = 'f3dee9edc41bafc9072649227292fff4576cb6cb-MzU2YTE5MmI3OTEzYjA0YzU0NTc0ZDE4YzI4ZDQ2ZTY=-aW50ZWdyYQ==-MTUyNjA5NTkwNw==';
    return this.http.get(this.baseEstabelecimentoPath + `?action=${action}&token=${token}`)

  }

  getReclamacoes(estabelecimento) {
    let action = 1;
    let token = 'f3dee9edc41bafc9072649227292fff4576cb6cb-MzU2YTE5MmI3OTEzYjA0YzU0NTc0ZDE4YzI4ZDQ2ZTY=-aW50ZWdyYQ==-MTUyNjA5NTkwNw==';
    return this.http.get(this.baseReclamacoesPath + `?action=${action}&token=${token}&estabelecimento=${estabelecimento}`)
  }

  saveReclamacao(reclamacao) {
    let action = 1;
    let token = 'f3dee9edc41bafc9072649227292fff4576cb6cb-MzU2YTE5MmI3OTEzYjA0YzU0NTc0ZDE4YzI4ZDQ2ZTY=-aW50ZWdyYQ==-MTUyNjA5NTkwNw==';
    return this.http.get(
      this.baseReclamacoesPath + `
      ?action=${action}&token=${token}&estabelecimento=${reclamacao.estabelecimento}
      &tipo=${reclamacao.tipo}&banco=${reclamacao.banco}&agencia=${reclamacao.agencia}
      &data=${reclamacao.data}&hora=${reclamacao.hora}&espera=${reclamacao.espera}&atendido=${reclamacao.atendido}
      &queixa=${reclamacao.queixa}&anexos=${reclamacao.anexos}`
    )
    // ANEXOS ESTÁ EM ARRAY
  }

}
