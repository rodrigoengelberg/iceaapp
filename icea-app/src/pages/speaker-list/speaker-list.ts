import { Component, ViewChild } from '@angular/core';

import {
  App,
  ActionSheetController,
  ActionSheetOptions,
  Config, List
} from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { SpeakerDetailPage } from "../speaker-detail/speaker-detail";
import { OrderBy } from "../../providers/orderBy";

export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean | void;
}

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html'
})
export class SpeakerListPage {

  @ViewChild('speakerList', {read: List}) speakerList: List;

  queryText = '';
  speakers: any = [];

  constructor(public app: App,
              public actionSheetCtrl: ActionSheetController,
              public confData: ConferenceData,
              public config: Config,
              public orderBy: OrderBy) {
  }

  ionViewDidLoad() {
    this.updateSpeaker();
  }

  goToSpeakerDetail(speaker: any) {
    this.app.getRootNav().push(SpeakerDetailPage, {speakerId: speaker.id});
  }

  openContact(speaker: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Entrar em contato ' + speaker.name,
      buttons: [
        // {
        //   text: `Telefone / Whatsapp ( ${speaker.phone} )`,
        //   icon: mode !== 'ios' ? 'call' : null,
        //   handler: () => {
        //     window.open('tel:' + speaker.phone);
        //   }
        // } as ActionSheetButton,
        {
          text: `E-mail ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }

  updateSpeaker() {
    this.speakerList && this.speakerList.closeSlidingItems();

    this.confData.getSpeakers(this.queryText).subscribe((speakers: any[]) => {
      this.speakers = speakers;

      this.speakers = this.orderBy.transform(speakers, 'name');

    });

  }

}
