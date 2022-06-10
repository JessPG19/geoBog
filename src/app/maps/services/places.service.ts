import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public useLocation?: [number,number];

  get isUserLocationReady(): boolean{
    return !!this.useLocation;
  }
  constructor(private placesApi:HttpClient) {
    this.getUserLocation();
   }

  public async getUserLocation(): Promise<[number,number]>{
    return new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(
        ({coords})=>{
          this.useLocation =[coords.latitude,coords.longitude];
          resolve(this.useLocation)}
      ), (err)=>{
        alert(err);
        console.error(err);
        reject();
      }
    })
  }
  getLayers(name:string){
    return this.placesApi.get(`https://raw.githubusercontent.com/JessPG19/geoBog/main/src/assets/geojson/${name}.json`);
  }
}
