import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProcessosPage } from './processos';

@NgModule({
  declarations: [
    ProcessosPage,
  ],
  imports: [
    IonicPageModule.forChild(ProcessosPage),
  ],
})
export class ProcessosPageModule {}
