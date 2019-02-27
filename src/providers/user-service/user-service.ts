import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ReplaySubject, Observable} from 'rxjs';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { catchError } from 'rxjs/operators';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  baseUrl = 'http://192.168.1.39:8080';
  username: any;
  password: any;
  db: SQLiteObject = null;
  modelos: any[] = [];
  generatedSqlQuery: string;
  private isOpen: boolean;
  image = '../../assets/imgs/irlanda.jpg';
  name='Irlanda';
  listing='72 Listing';

  constructor(public http: HttpClient, public toastCtrl: ToastController, public sqlite: SQLite, public loadingCtrl: LoadingController) {
    console.log('Hello UserServiceProvider Provider');
    if(!this.isOpen){
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db) => {
        this.setDatabase(db);
        // let sqldelete = 'DROP TABLE recommendations';
        // this.db.executeSql(sqldelete, []);
        this.createTables();
        this.isOpen = true;
        // const toast = this.toastCtrl.create({
        //   message: 'funcionó creación db ',
        //   duration: 3000
        // });
        // toast.present();
      })
      .catch(error => {
        console.log(error);
        console.error(error);
        const toast = this.toastCtrl.create({
          message: 'Error: ' + JSON.stringify(error),
          duration: 3000
        });
        toast.present();
      })
    }
  }

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  createTables(){
    let sqlRecommendations = 'CREATE TABLE IF NOT EXISTS recommendations(id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT, name TEXT, hearts TEXT)';
    this.db.executeSql(sqlRecommendations, []);
    let sqlRequests = 'CREATE TABLE IF NOT EXISTS travelRequests(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, x_solicitante_id INTEGER, x_medio_transporte TEXT, x_project_id INTEGER, x_lista_lugar_origen TEXT, x_lugar_origen TEXT, x_lista_lugar_destino TEXT, x_lugar_destino TEXT, x_fecha_ida TEXT, x_fecha_vuelta TEXT, x_nombre_hotel TEXT, x_fecha_entrada TEXT, x_fecha_salida TEXT, x_observaciones TEXT)';
    this.db.executeSql(sqlRequests, [])
    .catch(error => {
      console.log(error);
      console.error(error);
      const toast = this.toastCtrl.create({
        message: 'Error: ' + JSON.stringify(error),
        duration: 10000
      });
      toast.present();
    });
    // this.insert();
  }

  insert(){
    let insert = 'INSERT INTO recommendations(image, name, hearts) VALUES(?,?,?)';
    this.db.executeSql(insert, [this.image, this.name, this.listing])
    .catch(error => {
      console.log(error);
      console.error(error);
      const toast = this.toastCtrl.create({
        message: 'Error: ' + JSON.stringify(error),
        duration: 10000
      });
      toast.present();
    });
  }

  getRecommendations(){
    let sql = 'SELECT * FROM recommendations';
    return this.db.executeSql(sql, [])
    .then(response => {
      let recommendation = [];
      for(let index = 0; index < response.rows.length; index++){
        recommendation.push(response.rows.item(index));
      }
      return Promise.resolve(recommendation);
    })
    .catch(error => Promise.reject(error));
  }

  postRecommendation(img: any, name: any, heart: any){
    let sql = 'INSERT INTO recommendations(image, name, hearts) VALUES(?,?,?)';
    return this.db.executeSql(sql, [img, name, heart]);
  }

  updateRecommendation(){
    let sql = 'UPDATE recommendations SET image=?, name=?, hearts=? WHERE id=?';
    return this.db.executeSql(sql, [this.image, this.name, this.listing]);
  }

  deleteRecommendation(id){
    let sql = 'DELETE FROM recommendations WHERE id=?';
    return this.db.executeSql(sql, [id]);
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

  deleteTravelSql(id){
    let sql = 'DELETE FROM travelRequests WHERE id=?';
    return this.db.executeSql(sql, [id]);
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

  postTravelSql(travel){
    let sql = 'INSERT INTO travelRequests(name, x_solicitante_id, x_medio_transporte, x_project_id, x_lista_lugar_origen, x_lugar_origen, x_lista_lugar_destino, x_lugar_destino, x_fecha_ida, x_fecha_vuelta, x_nombre_hotel, x_fecha_entrada, x_fecha_salida, x_observaciones) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    return this.db.executeSql(sql, [travel.name, travel.x_solicitante_id, travel.x_medio_transporte, travel.x_project_id, travel.x_lista_lugar_origen, travel.x_lugar_origen, travel.x_lista_lugar_destino, travel.x_lugar_destino, travel.x_fecha_ida, travel.x_fecha_vuelta, travel.x_nombre_hotel, travel.x_fecha_entrada, travel.x_fecha_salida, travel.x_observaciones]);
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

  updateTravelSql(travel:any, travelId: number){
    let sql = 'UPDATE travelRequests SET name=?, x_solicitante_id=?, x_medio_transporte=?, x_project_id=?, x_lista_lugar_origen=?, x_lugar_origen=?, x_lista_lugar_destino=?, x_lugar_destino=?, x_fecha_ida=?, x_fecha_vuelta=?, x_nombre_hotel=?, x_fecha_entrada=?, x_fecha_salida=?, x_observaciones=? WHERE id=?';
    return this.db.executeSql(sql, [travel.name, travel.x_solicitante_id, travel.x_medio_transporte, travel.x_project_id, travel.x_lista_lugar_origen, travel.x_lugar_origen, travel.x_lista_lugar_destino, travel.x_lugar_destino, travel.x_fecha_ida, travel.x_fecha_vuelta, travel.x_nombre_hotel, travel.x_fecha_entrada, travel.x_fecha_salida, travel.x_observaciones, travelId]);
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