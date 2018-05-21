import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {  LoadingController } from 'ionic-angular';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {
	private loading:any;

  constructor(public http: Http,
  			 private _loading: LoadingController
			// private toastCtrl: ToastController,
			// private _alert: AlertController
  		) {
   
  }


	showLoader(){
	    this.loading = this._loading.create({
	      content: 'Please wait...',
	    });
	    this.loading.present();
	}

		hideLoader(){
	    this.loading.dismiss();
	}
}
