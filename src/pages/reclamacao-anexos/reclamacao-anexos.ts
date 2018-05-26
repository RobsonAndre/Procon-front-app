import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { UtilProvider } from '../../providers/util/util';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

/**
 * Generated class for the ReclamacaoAnexosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reclamacao-anexos',
  templateUrl: 'reclamacao-anexos.html',
})
export class ReclamacaoAnexosPage {

  public user: any;
  public reclamacao: any;
  public imageURI: any;
  public imageFileName: any;
  public anexos: any;
  public campos: any = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private fileTransfer: FileTransfer,
    private transfer: FileTransfer,
    private utilProvider: UtilProvider,
    private localStorageProvider: LocalStorageProvider,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {
  }

  public fechaPage() {
    this.navCtrl.pop();
  }


  getImage() {
      
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,  
        encodingType: this.camera.EncodingType.JPEG,
        allowEdit: true,
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
  
    }

    adicionarAnexo(options) {
      this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        //this.reclamacao.anexos.push(base64Image);
        this.imageURI = base64Image;
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
  


  public uploadFile() {
    
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let dateMS = new Date().getTime();
    
    let imgName = 'img-upload.' + this.user.uid + '.' + dateMS + '.jpg';

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: imgName,
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://www.papiroweb.com.br/integra/imagens/index.php', options)
      .then((data) => {
      console.log('Sucesso:'+ data);
      this.reclamacao.anexos.push(imgName);
      this.localStorageProvider.setDataReclamacao(this.reclamacao);
      this.imageURI = "";
    }, (err) => {
      console.log(err);
    });
  }

  private pegaAnexos(){
    this.anexos = this.reclamacao.anexos;
  }

  public delAnexo(i){
    console.log(i);
    this.deletarAnexo(i);
  }

  public deletarAnexo(i){


      console.log(i);
      this.reclamacao.anexos.splice(i);
      this.localStorageProvider.setDataReclamacao(this.reclamacao);
      this.initPage();
    
  }

  private initPage(){
    this.reclamacao = this.localStorageProvider.getDataReclamacao();
    this.user = this.localStorageProvider.getUserData();
    this.pegaAnexos();
  }


  ionViewDidEnter() {
    this.initPage();
    console.log("usr: " + this.user);
    console.log("rec: " + this.reclamacao);
    console.log('Reclamacao Anexo');
  }

}
