import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider} from '../../providers/user-service/user-service';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { InsertTravelPage } from '../insertTravel/insertTravel';
import { Travel } from '../../models/travel';
import { UpdateTravelPage } from '../updateTravel/updateTravel';

@Component({
  selector: 'page-travelRequests',
  templateUrl: 'travelRequests.html'
})
export class TravelRequestsPage {
  travels: any;

  constructor(public navCtrl: NavController, public servicio: UserServiceProvider, public toastCtrl: ToastController) {

  }

  ionViewDidLoad(){
    this.servicio.getTravels().subscribe(
      (data) => {
        this.travels = data;
      },
      (error) => {
        console.error(error);
        const toast = this.toastCtrl.create({
          message: 'Error: no puede acceder al servidor, no dispone de conexión a internet',
          duration: 10000
        });
        toast.present();
      }
    )
  }

  insertTravel(){
    this.navCtrl.push(InsertTravelPage, {"parentPage": this});
  }

  updateTravel(travel: Travel){
    this.navCtrl.push(UpdateTravelPage, {travel: travel, "parentPage": this});
  }

  deleteTravel(id){
    this.servicio.deleteTravel(id).subscribe(
      (data) =>{
        this.travels.splice(
          this.travels.map(item => item.id).indexOf(id), 1)
        console.log(data);
        const toast = this.toastCtrl.create({
          message: 'Travel was deleted successfully',
          duration: 3000
        });
        toast.present();
      },
      (error) =>{
        console.log(error);
        const toast = this.toastCtrl.create({
          message: error.message,
          duration: 3000
        });
        toast.present();
      }
    );
    this.servicio.deleteTravelSql(id).then(
      (data) =>{
        // this.models.splice(
        //   this.models.map(item => item.id).indexOf(id), 1)
        // console.log(data);
        const toast = this.toastCtrl.create({
          message: 'Travel was deleted successfully to SQLite db',
          duration: 3000
        });
        toast.present();
      },
      (error) =>{
        console.log(error);
      }
    );
  }

}
