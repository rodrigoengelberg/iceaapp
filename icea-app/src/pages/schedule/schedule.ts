import { Component, ViewChild } from '@angular/core';

import {
  App, ItemSliding, List, ModalController, NavController, ToastController, Refresher, AlertController
} from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { SupportPage } from "../support/support";

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  @ViewChild('scheduleList', {read: List}) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];

  constructor(public app: App,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public confData: ConferenceData,
              public user: UserData,) {
  }

  ionViewDidLoad() {
    this.app.setTitle('Calendário');
    this.updateSchedule();
  }

  updateSchedule() {
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  support() {
    this.navCtrl.push(SupportPage);
  }

  goToSessionDetail(sessionData: any) {
    this.app.getRootNav().push(SessionDetailPage, {sessionId: sessionData.id, name: sessionData.name});
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {
    if (this.user.hasFavorite(sessionData.id)) {
      this.removeFavorite(slidingItem, sessionData, 'Esse evento já está salvo');
    } else {
      this.user.addFavorite(sessionData.id);

      let alert = this.alertCtrl.create({
        title: 'Salvo com sucesso!',
        buttons: [{
          text: 'OK',
          handler: () => {
            slidingItem.close();
          }
        }]
      });
      alert.present();
    }
  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Você gostaria de remover esse evento?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Remover',
          handler: () => {
            this.user.removeFavorite(sessionData.id);
            this.updateSchedule();
            slidingItem.close();
          }
        }
      ]
    });
    alert.present();
  }

  doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;

      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Sessão foi atualizada.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }

}
