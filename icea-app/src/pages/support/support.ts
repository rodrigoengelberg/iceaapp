import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertController, NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-user',
  templateUrl: 'support.html'
})
export class SupportPage {

  submitted: boolean = false;
  supportMessage: string;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {

  }

  ionViewDidEnter() {
    let toast = this.toastCtrl.create({
      message: 'Sem suporte a envio de mensagem no momento.',
      duration: 3000
    });
    toast.present();
  }

  submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.supportMessage = '';
      this.submitted = false;

      let toast = this.toastCtrl.create({
        message: 'Sua mensagem foi enviada com sucesso.',
        duration: 3000
      });
      toast.present();
    }
  }

  // If the user enters text in the support question and then navigates
  // without submitting first, ask if they meant to leave the page
  ionViewCanLeave(): boolean | Promise<boolean> {
    // If the support message is empty we should just navigate
    if (!this.supportMessage || this.supportMessage.trim().length === 0) {
      return true;
    }

    return new Promise((resolve: any, reject: any) => {
      let alert = this.alertCtrl.create({
        title: 'Sair dessa página?',
        message: 'Tem certeza que deseja sair? Sua mensagem não será enviada.'
      });
      alert.addButton({text: 'Stay', handler: reject});
      alert.addButton({text: 'Leave', role: 'cancel', handler: resolve});

      alert.present();
    });
  }
}
