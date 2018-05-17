import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { UtilProvider } from '../../providers/util/util';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { RegistroReclamacaoProvider } from '../../providers/registro-reclamacao/registro-reclamacao';
import { ModalController } from 'ionic-angular';
import { ReclamacaoPage } from '../reclamacao/reclamacao';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    Camera
  ]
})
export class RegistroReclamacaoPage {

  public reclamacao: any;
  public estabelecimentos: any;
  public reclamacoes: any;
  public enableAnexo: any;
  public reclamacaoGravada: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utilProvider: UtilProvider,
    public registroReclamacaoProvider: RegistroReclamacaoProvider,
    public localStorageProvider: LocalStorageProvider,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private camera: Camera
  ) {
    this.reclamacao = {};
    this.reclamacao.anexos = [];
    this.carregarEstabelecimentos();
  }

  //ionViewDidEnter

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroReclamacaoPage');
  }

  carregarEstabelecimentos() {
    this.registroReclamacaoProvider.getEstabelecimentos().subscribe(
      data => {
        let obj: any = data;
        if (obj.success) {
          this.estabelecimentos = obj.results;
        }
      }
    )
  }

  carregarReclamacoes(rec) {
    this.registroReclamacaoProvider.getReclamacoes(rec).subscribe(
      data => {
        let obj: any = data;
        if (obj.success) {
          this.reclamacoes = obj.results.list;
        }
      }
    )
  }

  // MUDAR VISIBILDADE QUANDO A FUNÇÃO FOR CARREGADA DINAMICAMENTE
  public carregarForm() {
    let modal = this.modalCtrl.create(ReclamacaoPage);
    //console.log("rec before", this.reclamacao);
    modal.onDidDismiss(data => {
      this.reclamacao.data = data;
      console.log("rec", this.reclamacao);
    });
    modal.present();
  }

  // abrirDados() {

  // }

  confirmarReclamacao() {
    // CONSERTAR FUNÇÃO DE GRAVAÇÃO NO PROVIDER 
    // this.registroReclamacaoProvider.saveReclamacao(this.reclamacao).subscribe(
    //   data => {
    //     let obj: any = data;
    //     if(obj.success) {
    //       this.reclamacaoGravada = obj;
    //       this.localStorageProvider.setUserData(this.reclamacaoGravada);
    //     }
    //   }
    // )
    console.log(this.reclamacao);
  }

  public escolherAnexo() {
    
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL, //FILE_URI, NATIVE_URI, or DATA_URL. DATA_URL could produce memory issues. 
        //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        allowEdit: true,
        targetWidth: 300,
        targetHeight: 300,
        saveToPhotoAlbum: false,
      };


      let actionSheet = this.actionSheetCtrl.create({
        title: 'Adicionar anexo',
        buttons: [
          {
            text: 'Camera',
            handler: () => {
              console.log('Camera clicked');
              options.sourceType = this.camera.PictureSourceType.CAMERA;
              this.adicionarAnexo(options);
            }
          },
          {
            text: 'Galeria',
            handler: () => {
              console.log('Galeria clicked');
              options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
              this.adicionarAnexo(options);
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelar clicked');
            }
          }
        ]
      });

      actionSheet.present();
    
    console.log(this.reclamacao);

  }

  adicionarAnexo(options) {
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.reclamacao.anexos.push(base64Image);
    }, (err) => {
      this.alertaErro();
    }
    )
  }

  alertaErro() {
    let alert = this.alertCtrl.create({
      title: 'Erro!',
      subTitle: 'Não foi possível adicionar o anexo',
      buttons: ['Ok']
    });
    alert.present();
  }

  public carregarCampo(opcao: any) {
    this.utilProvider.abreLoading();
    console.log(this.reclamacao);
    if (this.reclamacao.estabelecimento) {
      this.carregarReclamacoes(this.reclamacao.estabelecimento);
    }
    // if (this.reclamacao.tipo) {
    //   this.carregarForm();
    // }
    this.utilProvider.fechaLoading();
  }

}
