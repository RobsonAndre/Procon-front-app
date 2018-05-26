import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { RegistroReclamacaoProvider } from '../../providers/registro-reclamacao/registro-reclamacao';
import { ModalController } from 'ionic-angular';
import { ReclamacaoPage } from '../reclamacao/reclamacao';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

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
  providers: [
    Camera,
    FileTransfer
  ]
})
export class RegistroReclamacaoPage {

  public user: any;
  public reclamacao: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public registroReclamacaoProvider: RegistroReclamacaoProvider,
    public localStorageProvider: LocalStorageProvider,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private fileTransfer: FileTransfer

  ) {
    
  }


  //openPage
  public abrePage(page, options={}){
    
    console.log(page);
    this.navCtrl.push(page, options);
  
  }
  ionViewDidEnter() {
    this.reclamacao = this.localStorageProvider.getDataReclamacao();
    this.user = this.localStorageProvider.getUserData();
    console.log("usr: " + this.user);
    console.log("rec: " + this.reclamacao);
    console.log('Registro Reclamacao');
  }

}
