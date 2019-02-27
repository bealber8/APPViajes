import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-recomendations',
  templateUrl: 'recomendations.html'
})
export class RecomendationsPage {
  recommendations: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public servicio: UserServiceProvider) {

  }

  ionViewDidLoad(){
    console.log('hola')
    this.servicio.getRecommendations().then(
      (data) => {
        this.recommendations = data;
        const toast = this.toastCtrl.create({
          message: this.recommendations.image,
          duration: 10000
        });
        toast.present();
        // this.models.image = 'data:image/jpeg;base64,' + this.models.image;
        console.log(this.recommendations.image);
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
