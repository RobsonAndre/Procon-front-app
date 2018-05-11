import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { UtilProvider } from '../providers/util/util';
import { LoginPage } from '../pages/login/login';
import { ContaPage } from '../pages/conta/conta';
import { TermoPage } from '../pages/termo/termo';
import { PoliticaPage } from '../pages/politica/politica';
import { IntroPage } from '../pages/intro/intro';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { RegistroReclamacaoPage } from '../pages/registro-reclamacao/registro-reclamacao';

@Component({
  templateUrl: 'app.html',
  providers: [
    UtilProvider
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;
  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public utilProvider: UtilProvider,
    public localStorageProvider: LocalStorageProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login',                   component: LoginPage    },
      { title: 'Intro',                   component: IntroPage    },
      { title: 'Home',                    component: HomePage     },
      { title: 'Minha Conta',             component: ContaPage    },
      { title: 'Termo de Uso',            component: TermoPage    },
      { title: 'Política de Privacidade', component: PoliticaPage },
      { title: 'Registro de Reclamação',  component: RegistroReclamacaoPage }
    ];

  }

  public abreToast(msg){
    this.utilProvider.showToast(msg);
    console.log(msg);
  }

  public logOut(){
    console.log("Sair do App");
    this.localStorageProvider.cleanUserData();
    this.nav.setRoot(LoginPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
