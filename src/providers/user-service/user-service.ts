import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ReplaySubject, Observable} from 'rxjs';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { catchError } from 'rxjs/operators';
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  baseUrl = 'http://localhost:8080';
  username: any;
  password: any;

  constructor(public http: HttpClient, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    console.log('Hello UserServiceProvider Provider');
  }

  login(username, password){
    this.username = username;
    this.password = password;
    console.log(this.username, this.password);
  }

  getOptions(){
    let user = this.username;
    let pwd = this.password;
    let base64UserAndPassword = window.btoa(user + ":" + pwd);

    let basico = 'basic ' + base64UserAndPassword;
    console.log(basico)
    let options = {
      headers: {
        'Access-Control-Allow-Origin' : 'http://localhost:8100',
        'Authorization': basico,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };

    console.log('paso por options')
    return options;
  }

  postUser(user){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('name', user.name);
    urlSearchParams.append('surname', user.surname);
    urlSearchParams.append('address', user.address);
    urlSearchParams.append('telephone', user.telephone);
    urlSearchParams.append('email', user.email);
    urlSearchParams.append('username', user.username);
    urlSearchParams.append('password', user.password);
    let body = urlSearchParams.toString();

    let options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };
    return this.http.post(this.baseUrl + "/users", body, options);
  }

  // showLoading(message: string = 'Working'): Loading {
  //   const loading = this.loadingCtrl.create({
  //     spinner: 'bubbles',
  //     content: `${message} ...`
  //   });

  //   loading.present();
  //   return loading;
  // }

  getTravels(){
    return this.http.get(this.baseUrl + "/viajes");
  }

  deleteTravel(id){
    let options = this.getOptions();
    return this.http.delete(this.baseUrl + "/viajes/" + id, options);
  }

  postTravel(travel){
    // console.log(model);
    // console.log(this.username, this.password);
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('name', travel.name);
    urlSearchParams.append('x_solicitante_id', travel.x_solicitante_id);
    urlSearchParams.append('x_medio_transporte', travel.x_medio_transporte);
    urlSearchParams.append('x_project_id', travel.x_project_id);
    urlSearchParams.append('x_lista_lugar_origen', travel.x_lista_lugar_origen);
    urlSearchParams.append('x_lugar_origen', travel.x_lugar_origen);
    urlSearchParams.append('x_lista_lugar_destino', travel.x_lista_lugar_destino);
    urlSearchParams.append('x_lugar_destino', travel.x_lugar_destino);
    urlSearchParams.append('x_fecha_ida', travel.x_fecha_ida);
    urlSearchParams.append('x_fecha_vuelta', travel.x_fecha_vuelta);
    urlSearchParams.append('x_nombre_hotel', travel.x_nombre_hotel);
    urlSearchParams.append('x_fecha_entrada', travel.x_fecha_entrada);
    urlSearchParams.append('x_fecha_salida', travel.x_fecha_salida);
    urlSearchParams.append('x_observaciones', travel.x_observaciones);
    let body = urlSearchParams.toString();

    let options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };
    return this.http.post(this.baseUrl + "/viajes", body, options);
  }

  updateTravel(travel:any, travelId: number): Observable<any> {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('name', travel.name);
    urlSearchParams.append('x_solicitante_id', travel.x_solicitante_id);
    urlSearchParams.append('x_medio_transporte', travel.x_medio_transporte);
    urlSearchParams.append('x_project_id', travel.x_project_id);
    urlSearchParams.append('x_lista_lugar_origen', travel.x_lista_lugar_origen);
    urlSearchParams.append('x_lugar_origen', travel.x_lista_lugar_origen);
    urlSearchParams.append('x_lista_lugar_destino', travel.x_lista_lugar_destino);
    urlSearchParams.append('x_lugar_destino', travel.x_lista_lugar_destino);
    urlSearchParams.append('x_fecha_ida', travel.x_fecha_ida);
    urlSearchParams.append('x_fecha_vuelta', travel.x_fecha_vuelta);
    urlSearchParams.append('x_nombre_hotel', travel.x_nombre_hotel);
    urlSearchParams.append('x_fecha_entrada', travel.x_fecha_entrada);
    urlSearchParams.append('x_fecha_salida', travel.x_fecha_salida);
    urlSearchParams.append('x_observaciones', travel.x_observaciones);
    let body = urlSearchParams.toString();

    let options = this.getOptions();
    console.log('llego update')
    return this.http.put(this.baseUrl + "/viajes/"+ travelId, body, options).pipe(
      catchError(this.handleError)
    );
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    console.log('hola');
    console.log(error.status);
    console.log(error.statusText);
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}