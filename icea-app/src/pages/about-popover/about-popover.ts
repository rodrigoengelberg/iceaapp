import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController } from 'ionic-angular';


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close('https://www.igrejacristaevangelica.com.br/site/novo')">ICEB</button>
      <button ion-item (click)="close('https://rodrigoengelberg.com.br')">Desenvolvedor</button>
      <!--<button ion-item (click)="support()">Sugestões e reclamações</button>-->
    </ion-list>
  `
})
export class PopoverPage {

  constructor(public viewCtrl: ViewController,
              public navCtrl: NavController,
              public app: App,
              public modalCtrl: ModalController) {
  }

  support() {
    this.app.getRootNav().push('SupportPage');
    this.viewCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }
}
