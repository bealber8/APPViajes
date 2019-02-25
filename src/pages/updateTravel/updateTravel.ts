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
      error => console.log(error)
    );
  }

  // postTravel(){
  //   var travel = {
  //     name: this.formInsert.get('name').value,
  //     x_solicitante_id: this.formInsert.get('x_solicitante_id').value,
  //     x_medio_transporte: this.formInsert.get('x_medio_transporte').value,
  //     x_project_id: this.formInsert.get('x_project_id').value,
  //     x_lista_lugar_origen: this.formInsert.get('x_lista_lugar_origen').value,
  //     x_lugar_origen: this.formInsert.get('x_lista_lugar_origen').value,
  //     x_lista_lugar_destino: this.formInsert.get('x_lista_lugar_destino').value,
  //     x_lugar_destino: this.formInsert.get('x_lista_lugar_destino').value,
  //     x_fecha_ida: this.formInsert.get('x_fecha_ida').value,
  //     x_fecha_vuelta: this.formInsert.get('x_fecha_vuelta').value,
  //     x_nombre_hotel: this.formInsert.get('x_nombre_hotel').value,
  //     x_fecha_entrada: this.formInsert.get('x_fecha_entrada').value,
  //     x_fecha_salida: this.formInsert.get('x_fecha_salida').value,
  //     x_observaciones: this.formInsert.get('x_observaciones').value,
  //   }
  //   this.servicio.postTravel(travel).subscribe(
  //     (data) => {
  //       this.navParams.get("parentPage").ionViewDidLoad();
  //       this.navCtrl.pop();
  //       console.log(data);
        
  //       const toast = this.toastCtrl.create({
  //         message: 'Travel request was added successfully',
  //         duration: 3000
  //       });
  //       toast.present();
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  // insertTravel(){
  //   this.navCtrl.push(InsertTravelPage, {"parentPage": this});
  // }

  // updateTravel(travel: Travel){
  //   this.navCtrl.push(UpdateTravelPage, {travel: travel, "parentPage": this});
  // }

  // deleteTravel(id){
  //   this.servicio.deleteTravel(id).subscribe(
  //     (data) =>{
  //       this.travels.splice(
  //         this.travels.map(item => item.id).indexOf(id), 1)
  //       console.log(data);
  //       const toast = this.toastCtrl.create({
  //         message: 'Travel was deleted successfully',
  //         duration: 3000
  //       });
  //       toast.present();
  //     },
  //     (error) =>{
  //       console.log(error);
  //       const toast = this.toastCtrl.create({
  //         message: error.message,
  //         duration: 3000
  //       });
  //       toast.present();
  //     }
  //   );
  // }

}
