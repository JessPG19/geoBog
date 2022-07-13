import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { RestService } from 'src/app/services/rest.service';
import {PlacesService} from '../../services/places.service';

@Component({selector: 'app-map-view', templateUrl: './map-view.component.html', styleUrls: ['./map-view.component.css']})
export class MapViewComponent implements OnInit {

  @ViewChild('mapDiv')
  load = true
  mapDivElement !: ElementRef;
  map;
  mapLocation;
  // nameLocalityLET = layer to add map
  localidadeslet;
  localidades;
  antonionarinolet;
  barriosunidoslet;
  bosalet;
  candelarialet;
  chapinerolet;
  fontibonlet;
  martireslet;
  puentearandalet;
  rafaeluribelet;
  sancristoballet;
  santafelet;
  teusaquillolet;
  tunjuelitolet;
  usaquenlet;
  usmelet;
  // locality = info type GeoJSON
  antonionarino;
  barriosunidos;
  bosa;
  candelaria;
  chapinero;
  fontibon;
  martires;
  puentearanda;
  rafaeluribe;
  sancristobal;
  santafe;
  teusaquillo;
  tunjuelito;
  usaquen;
  usme;

  constructor(private placesService : PlacesService, private _saveService : RestService,private router: Router) {}

  ngOnInit() {
    this.getLayersInfo();
    this.placesService.getLayers('localidades').subscribe(res => {
        this.localidades = res;
        if (!this.placesService.useLocation)
            throw new Error("No Hay PlacesServices.location");
    }, (error) => console.error(error), () => {
        const response = this.loadMap(this.map);
        const base = this.loadBaseMaps(response);
        this.mapLocation = response;
        setTimeout(() => this.loadLayers(response, base), 7000);
    });
  }


  getLayersInfo() {
    this.placesService.getLayers('ANTONIONARINO').subscribe(res => this.antonionarino = res);
    this.placesService.getLayers('BARRIOSUNIDOS').subscribe(res => this.barriosunidos = res);
    this.placesService.getLayers('CANDELARIA').subscribe(res => this.candelaria = res);
    this.placesService.getLayers('CHAPINERO').subscribe(res => this.chapinero = res);
    this.placesService.getLayers('LOSMARTIRES').subscribe(res => this.martires = res);
    this.placesService.getLayers('SANTAFE').subscribe(res => this.santafe = res);
    this.placesService.getLayers('TEUSAQUILLO').subscribe(res => this.teusaquillo = res);
    // this.placesService.getLayers('BOSA').subscribe(res => this.bosa = res)
    // this.placesService.getLayers('FONTIBON').subscribe(res => this.fontibon = res)
    // this.placesService.getLayers('PUENTEARANDA').subscribe(res => this.puentearanda = res)
    // this.placesService.getLayers('RAFAELURIBE').subscribe(res => this.rafaeluribe = res)
    // this.placesService.getLayers('SANCRISTOBAL').subscribe(res => this.sancristobal = res)
    // this.placesService.getLayers('TUNJUELITO').subscribe(res => this.tunjuelito = res)
    // this.placesService.getLayers('USAQUEN').subscribe(res => this.usaquen = res)
    // this.placesService.getLayers('USME').subscribe(res => this.usme = res)
  }

  goToMyLocation() {
    const lat = this.placesService.useLocation[0]
    const lng = this.placesService.useLocation[1]
    const latLon = L.latLng(lat, lng);
    this.mapLocation.setView(latLon, 18, {animation: true})
  }

  loadMap(map) {
    map = L.map('map', {
      center: this.placesService.useLocation,
      zoom: 18,
      maxZoom: 22,
      minZoom: 6,
      zoomControl: false
    });
    // control zoom
    L.control.zoom({position: 'topleft'}).addTo(map);
    let marker;
    var greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [
          25, 41
      ],
      iconAnchor: [
          12, 41
      ],
      popupAnchor: [
          1, -34
      ],
      shadowSize: [41, 41]
    });

    marker = L.marker(this.placesService.useLocation, {icon: greenIcon});
    marker.addTo(map);
    return map
  }

  loadBaseMaps(map) {
    // config base maps
    const configLayers = {
        maxZoom: 22,
        minZoom: 3,
        subdomains: [
            'mt0', 'mt1', 'mt2', 'mt3'
        ],
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">Google</a>'
    }
    // Basemaps
    const satelite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', configLayers).addTo(map);
    const streets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', configLayers).addTo(map);
    const basemaps = {
        'Satelital': satelite,
        'Open Street Map': streets
    };
    return basemaps;
  }


  loadLayers(map, basemaps) { // layers
      this.antonionarinolet = L.geoJSON(this.antonionarino, {
          style: {
              "fillColor": "#D4AC0D",
              "color": "#D4AC0D"
          }
      });
      this.barriosunidoslet = L.geoJSON(this.barriosunidos, {
          style: {
              "fillColor": "#48C9B0",
              "color": "#48C9B0"
          }
      });
      this.candelarialet = L.geoJSON(this.candelaria, {
          style: {
              "fillColor": "#2471A3",
              "color": "#2471A3"
          }
      });
      this.chapinerolet = L.geoJSON(this.chapinero, {
          style: {
              "fillColor": "#008080",
              "color": "#008080"
          }
      });
      this.martireslet = L.geoJSON(this.martires, {
          style: {
              "fillColor": "#8E44AD",
              "color": "#8E44AD"
          }
      });
      this.santafelet = L.geoJSON(this.santafe, {
          style: {
              "fillColor": "#E74C3C",
              "color": "#E74C3C"
          }
      });
      this.teusaquillolet = L.geoJSON(this.teusaquillo, {
          style: {
              "fillColor": "#32CD32",
              "color": "#32CD32"
          }
      });
      this.localidadeslet = L.geoJSON(this.localidades, {
          style: {
              "fillColor": "#A5A5A5",
              "color": "#A5A5A5"
          }
      }).addTo(map);

      // this.bosalet = L.geoJSON(this.bosa, {style: {"fillColor": "#D35400", "color" : "#D35400"}});
      // this.fontibonlet = L.geoJSON(this.fontibon, {style: {"fillColor": "#D35400", "color" : "#D35400"}});
      // this.puentearandalet = L.geoJSON(this.puentearanda, {style: {"fillColor": "#D35400", "color" : "#D35400"}});
      // this.rafaeluribelet = L.geoJSON(this.rafaeluribe, {style: {"fillColor": "#D35400", "color" : "#D35400"}});
      // this.sancristoballet = L.geoJSON(this.sancristobal, {style: {"fillColor": "#D35400", "color" : "#D35400"}});
      // this.tunjuelitolet = L.geoJSON(this.tunjuelito, {style: {"fillColor": "#D35400", "color" : "#D35400"}});
      // this.usaquenlet = L.geoJSON(this.usaquen, {style: {"fillColor": "#D35400", "color" : "#D35400"}});
      // this.usmelet = L.geoJSON(this.usme, {style: {"fillColor": "#D35400", "color" : "#D35400"}});

      // legend
      const overlays = this.legend();

      map.createPane('labels');
      map.getPane('labels').style.zIndex = 650;
      map.getPane('labels').style.pointerEvents = 'none';

      this.setMessage();
      this.setBounds(map);

      L.control.layers(basemaps, overlays).addTo(map);
      setTimeout(() => {
          map.panTo(new L.LatLng(this.placesService.useLocation[0], this.placesService.useLocation[1]));
          this.load = false;
      }, 500);
  }

  setMessage = async () => {
    this.localidadeslet.eachLayer(layer => layer.bindPopup(this.messageLoc(layer.feature.properties)));
    this.antonionarinolet.eachLayer(layer => layer.bindPopup(this.message(layer.feature.properties)));
    this.barriosunidoslet.eachLayer(layer => layer.bindPopup(this.message(layer.feature.properties)));
    this.candelarialet.eachLayer(layer => layer.bindPopup(this.message(layer.feature.properties)));
    this.chapinerolet.eachLayer(layer => layer.bindPopup(this.message(layer.feature.properties)));
    this.martireslet.eachLayer(layer => layer.bindPopup(this.message(layer.feature.properties)));
    this.santafelet.eachLayer(layer => layer.bindPopup(this.message(layer.feature.properties)));
    this.teusaquillolet.eachLayer(layer => layer.bindPopup(this.message(layer.feature.properties)));
    // this.bosalet.eachLayer(layer =>{layer.bindPopup(this.messagelayer);});
    // this.fontibonlet.eachLayer(layer =>{layer.bindPopup(this.messagelayer);});
    // this.puentearandalet.eachLayer(layer =>{layer.bindPopup(this.messagelayer);});
    // this.rafaeluribelet.eachLayer(layer =>{layer.bindPopup(this.messagelayer);});
    // this.sancristoballet.eachLayer(layer =>{layer.bindPopup(this.messagelayer);});
    // this.tunjuelitolet.eachLayer(layer =>{layer.bindPopup(this.messagelayer);});
    // this.usaquenlet.eachLayer(layer =>{layer.bindPopup(this.messagelayer);});
    // this.usmelet.eachLayer(layer =>{layer.bindPopup(this.messagelayer);});
  }

  setBounds(map) {
    map.fitBounds(this.antonionarinolet.getBounds());
    map.fitBounds(this.barriosunidoslet.getBounds());
    map.fitBounds(this.candelarialet.getBounds());
    map.fitBounds(this.chapinerolet.getBounds());
    map.fitBounds(this.martireslet.getBounds());
    map.fitBounds(this.santafelet.getBounds());
    map.fitBounds(this.teusaquillolet.getBounds());
    // map.fitBounds(this.bosalet.getBounds());
    // map.fitBounds(this.fontibonlet.getBounds());
    // map.fitBounds(this.puentearandalet.getBounds());
    // map.fitBounds(this.rafaeluribelet.getBounds());
    // map.fitBounds(this.sancristoballet.getBounds());
    // map.fitBounds(this.tunjuelitolet.getBounds());
    // map.fitBounds(this.usaquenlet.getBounds());
    // map.fitBounds(this.usmelet.getBounds());
  }

  legend() {
    return {
        '<span style ="color: #D4AC0D;"> Antonio Nariño</span>': this.antonionarinolet,
        '<span style ="color: #48C9B0;"> Barrios Unidos</span>': this.barriosunidoslet,
        '<span style ="color: #2471A3;"> Candelaria</span>': this.candelarialet,
        '<span style ="color: #008080;"> Chapinero</span>': this.chapinerolet,
        '<span style ="color: #8E44AD;"> Los martires</span>': this.martireslet,
        '<span style ="color: #E74C3C;"> Santafe</span>': this.santafelet,
        '<span style ="color: #32CD32;"> Teusaquillo</span>': this.teusaquillolet,
        '<span style ="color: #A5A5A5;"> Localidades</span>': this.localidadeslet,
        // '<span style = "color: Black;"></span> Bosa': this.bosalet,
        // '<span style = "color: Black;"></span> Fontibon': this.fontibonlet,
        // '<span style = "color: Black;"></span> Puente aranda': this.puentearandalet,
        // '<span style = "color: Black;"></span> Rafael Uribe': this.rafaeluribelet,
        // '<span style = "color: Black;"></span> San Cristobal': this.sancristoballet,
        // '<span style = "color: Black;"></span> Tunjuelito': this.tunjuelitolet,
        // '<span style = "color: Black;"></span> Usaquen': this.usaquenlet,
        // '<span style = "color: Black;"></span> Usme': this.usmelet,
    }
  }

  message(layer) {
    const dir = layer.PDOCINTERI ? layer.PDOCINTERI : '' + layer.PDOTEXTO;
    const eje = layer.PDONVIAL
    const idi = layer.LOTCODIGO
    let div = document.createElement('div')
    let h3 = document.createElement('h3')
    h3.innerHTML =`${eje} ${dir}`

    div.append(h3)
    let span = document.createElement('span')
    span.innerHTML =`Código Predio: ${idi}`
    div.append(span)
    let span1 = document.createElement('span')
    span1.innerHTML =`Area: ${layer.Shape_Area} m`
    div.append(document.createElement('br'))
    div.append(span1)
    let span2 = document.createElement('span')
    span2.innerHTML =`Coordenadas: [${layer.Coordena_1}N, ${layer.Coordenada}W]`
    div.append(document.createElement('br'))
    div.append(span2)
    div.append(document.createElement('br'))

    let button = document.createElement('button')
    button.className = "mx-auto mt-3 d-flex btn btn-primary"
    button.innerHTML = "Formulario"
    button.id = idi
    button.onclick = ()=>this.saved(layer)
    div.append(button)

    return div;
  }

  messageLoc(propLoc) {
    return `<h3>${propLoc.Nombre_de_l}</h3>
            <span>Area: ${propLoc.Area_de_la_} m^2</span> <br/>
            <span>Acto administrativo: ${propLoc.Acto_admini}</span>
            <br/><br/>`
  }
  saved(layer){
    const dir = layer.PDOCINTERI ? layer.PDOCINTERI : '' + layer.PDOTEXTO;
    const eje = layer.PDONVIAL
    const loc = layer.Nombre_de_
    const idi = layer.LOTCODIGO
    console.log(idi,loc,eje,dir,layer);
    this._saveService.saveData(idi,loc,eje?.includes('null') ? '': eje,dir?.includes('null') ? '': dir);
    this.router.navigate(['newform/'+layer.LOTCODIGO]);
  }

}
