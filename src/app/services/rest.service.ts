import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map  } from 'rxjs/operators';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  sharingData = {
    id:"",
    localidad:"",
    eje_vial:"",
    direccion:""
  }

  // Observable string source
  private dataStringSource = new BehaviorSubject<Object>({});

  // Observable string stream
  dataString$ = this.dataStringSource.asObservable();

  constructor(private http: HttpClient) { }


  public saveData(id:string, localidad:string, eje_vial?: string, direccion?:string){
    this.sharingData.id = id;
    this.sharingData.localidad = localidad;
    if(eje_vial) this.sharingData.eje_vial = eje_vial;
    if(direccion) this.sharingData.direccion = direccion;
    this.dataStringSource.next(this.sharingData);
  }
  postInfo(info: any) {
    let res ={}
    res[info.codigo_lote]=info
    return this.http.patch(`${environment.URL_DB}/Information.json`, res).pipe(
      map((resp: any) => {
        return res;
      })
    );
  }

  getInfo(finit?, ffin?) {
    if(finit && ffin){
      return this.http
      .get(`${environment.URL_DB}/Information.json`)
      .pipe(map(data =>this.buildArrayInfoDate(data, finit, ffin)));
    }else{
      return this.http
      .get(`${environment.URL_DB}/Information.json`)
      .pipe(map(this.buildArrayInfo));
    }
  }

  private buildArrayInfoDate(info, finit, ffin) {
    const productos=[]
    if (info === null) return [];
    Object.keys(info).forEach((key) => {
      const info2 = info[key];

      if(moment(info2.fecha).format()>=finit && moment(info2.fecha).format() <=moment(ffin).add(1, 'days').format()){
        info2.id_info = key;
        productos.push(info2);
      }
    });
    return productos;
  }

  private buildArrayInfo(info) {
    const productos=[]
    if (info === null) return [];
    Object.keys(info).forEach((key) => {
      const info2 = info[key];
      info2.id_info = key;
      productos.push(info2);
    });
    return productos;
  }

  getInfobyId(id) {
      return this.http
      .get(`${environment.URL_DB}/Information/${id}.json`)
  }
}
