import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider} from '../../providers/user-service/user-service';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-insertTravel',
  templateUrl: 'insertTravel.html'
})
export class InsertTravelPage {
  travels: any;
  formInsert: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public servicio: UserServiceProvider, public fb: FormBuilder, public toastCtrl: ToastController) {
    this.formInsert = this.fb.group({
      name: ['', Validators.compose([Validators.maxLength(150), Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ ]*'), Validators.required])],
      x_solicitante_id: ['', Validators.required],
      x_medio_transporte: ['', Validators.required],
      x_project_id: ['', Validators.required],
      x_lista_lugar_origen: ['', Validators.required],
      x_lista_lugar_destino: ['', Validators.required],
      x_fecha_ida: ['', Validators.compose([Validators.maxLength(19), Validators.pattern('[0-9]{4}[-][0-9]{2}[-][0-9]{2}[ ][0-9]{2}[:][0-9]{2}[:][0-9]{2}'), Validators.required])],
      x_fecha_vuelta: ['', Validators.compose([Validators.maxLength(19), Validators.pattern('[0-9]{4}[-][0-9]{2}[-][0-9]{2}[ ][0-9]{2}[:][0-9]{2}[:][0-9]{2}'), Validators.required])],
      x_nombre_hotel: ['', Validators.compose([Validators.maxLength(150), Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ ]*'), Validators.required])],
      x_fecha_entrada: ['', Validators.compose([Validators.maxLength(19), Validators.pattern('[0-9]{4}[-][0-9]{2}[-][0-9]{2}[ ][0-9]{2}[:][0-9]{2}[:][0-9]{2}'), Validators.required])],
      x_fecha_salida: ['', Validators.compose([Validators.maxLength(19), Validators.pattern('[0-9]{4}[-][0-9]{2}[-][0-9]{2}[ ][0-9]{2}[:][0-9]{2}[:][0-9]{2}'), Validators.required])],
      x_observaciones: ['', Validators.compose([Validators.maxLength(300), Validators.pattern('[a-zA-Z0-9áéíóúÁÉÍÓÚ ]*'), Validators.required])]
    });
  }

  postTravel(){
    var travel = {
      name: this.formInsert.get('name').value,
      x_solicitante_id: this.formInsert.get('x_solicitante_id').value,
      x_medio_transporte: this.formInsert.get('x_medio_transporte').value,
      x_project_id: this.formInsert.get('x_project_id').value,
      x_lista_lugar_origen: this.formInsert.get('x_lista_lugar_origen').value,
      x_lugar_origen: this.formInsert.get('x_lista_lugar_origen').value,
      x_lista_lugar_destino: this.formInsert.get('x_lista_lugar_destino').value,
      x_lugar_destino: this.formInsert.get('x_lista_lugar_destino').value,
      x_fecha_ida: this.formInsert.get('x_fecha_ida').value,
      x_fecha_vuelta: this.formInsert.get('x_fecha_vuelta').value,
      x_nombre_hotel: this.formInsert.get('x_nombre_hotel').value,
      x_fecha_entrada: this.formInsert.get('x_fecha_entrada').value,
      x_fecha_salida: this.formInsert.get('x_fecha_salida').value,
      x_observaciones: this.formInsert.get('x_observaciones').value,
    }
    this.servicio.postTravel(travel).subscribe(
      (data) => {
        this.navParams.get("parentPage").ionViewDidLoad();
        this.navCtrl.pop();
        console.log(data);
        
        const toast = this.toastCtrl.create({
          message: 'Travel request was added successfully',
          duration: 3000
        });
        toast.present();
      },
      (error) => {
        console.log(error);
      }
    );

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
}
