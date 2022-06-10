import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }
  postInfo(info: any) {
    return this.http.post(`${environment.URL_DB}/Information.json`, info).pipe(
      map((resp: any) => {
        info.codigo_lote = resp.name;
        return info;
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
}
