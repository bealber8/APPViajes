import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider} from '../../providers/user-service/user-service';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Travel } from '../../models/travel';

@Component({
  selector: 'page-updateTravel',
  templateUrl: 'updateTravel.html'
})
export class UpdateTravelPage {
  travels: any;
  formInsert: FormGroup;
  travel: Travel = new Travel;
  constructor(public navCtrl: NavController, public navParams: NavParams, public servicio: UserServiceProvider, public fb: FormBuilder, public toastCtrl: ToastController) {
    this.travel = this.navParams.get('travel');
  }

  updateTravel(form: NgForm){
    this.servicio.updateTravel(form, this.travel.id).subscribe(
      result => {
        this.navParams.get("parentPage").ionViewDidLoad();
        this.navCtrl.pop();
        const toast = this.toastCtrl.create({
          message: 'Travel request was updated successfully',
          duration: 3000
        });
        toast.present();
      },
      error => {const toast = this.toastCtrl.create({
        message: error,
        duration: 3000
      });
      toast.present();}
    );
    this.servicio.updateTravelSql(form, this.travel.id).then(
      result => {
        this.navParams.get("parentPage").ionViewDidLoad();
        this.navCtrl.pop();
        const toast = this.toastCtrl.create({
          message: 'Travel was updated successfully to SQLite db',
          duration: 4000
        });
        toast.present();
      },
      error => {
        const toast = this.toastCtrl.create({
          message: 'Travel not updated to SQLite db',
          duration: 3000
        });
        toast.present();
      }
    );
  }
}
