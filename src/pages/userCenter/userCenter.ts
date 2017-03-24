import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {CropperPage} from '../cropper/cropper'
@Component({
  selector: 'userCenter-selector',
  templateUrl: 'userCenter.html'
})
export class UserCenterPage {

  constructor(public navCtrl: NavController) {

  }
  cropper() {
    this.navCtrl.push(CropperPage)
  }
}
