import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RestService } from 'src/app/services/rest.service';
import { Observable } from 'rxjs';

@Component( { selector: 'app-forms', templateUrl: './forms.component.html', styleUrls: [ './forms.component.css' ] } )
export class FormsComponent implements OnInit {
 id = null;
 localidad = null;
 validationForm : FormGroup;
 public loadData = null;
 public eje : String;
 public dir : String;
 public actividad : String;
 public destino : String;
 public descripcion : String;
 public levantamiento : String;
 public predial : Number;
 public estrato : Number;
 public gas : Number;
 public energia : Number;
 fecha : Date = new Date();

 constructor( private _activatedRoute : ActivatedRoute, private _rest : RestService ) {}

 ngOnInit(): void {
  this.id = this._activatedRoute.snapshot.paramMap.get( 'id' );
  let forms = document.querySelectorAll( '.needs-validation' );

  //get Data from Database
  this._rest.getInfobyId( this.id )
    .subscribe(
      l => this.loadData = l,
      err => console.error( err ))

  // Loop over them and prevent submission
  Array.prototype.slice.call( forms ).forEach( function ( form ) {
   form.addEventListener( 'submit', function ( event ) {
    if ( !form.checkValidity() ) {
     event.preventDefault()
     event.stopPropagation()
    }
    form.classList.add( 'was-validated' )
   }, false )
  } )
  setTimeout(() => {
    this.loadDataNew()
  }, 1000);

 }

 loadDataNew(){
  if ( !this.loadData ) {
    console.log('enas');

    this._rest.dataString$.subscribe( data => {
     this.id = data[ 'id' ];
     this.eje = data[ 'eje_vial' ];
     this.localidad = data[ 'localidad' ];
     this.dir = data[ 'direccion' ];
    },err=>console.error(err))
   }else{
    this.loadDataToForm()
   }
 }

 onSubmit( datos ) {

  if ( !datos.form.valid )
   return;


  const information = {
   codigo_lote: String,
   localidad: String,
   eje: String,
   direccion: String,
   actividad: String,
   destino: String,
   descripcion: String,
   predial: Number,
   estrato: Number,
   levantamiento: String,
   energia: Number,
   gas: Number,
   fecha: new Date
  }

  information.codigo_lote = this.id;
  information.localidad = this.localidad;
  information.eje = datos.form.controls.Eje.value;
  information.direccion = datos.form.controls.Dir.value;
  information.predial = datos.form.controls.Pred.value;
  information.destino = datos.form.controls.Dest.value;
  information.actividad = datos.form.controls.Act.value;
  information.estrato = datos.form.controls.Estr.value;
  information.energia = datos.form.controls.energia.value ? datos.form.controls.energia.value : 0
  information.gas = datos.form.controls.gas.value ? datos.form.controls.gas.value : 0
  information.levantamiento = datos.form.controls.levan.value ? datos.form.controls.levan.value : ' '
  information.descripcion = datos.form.controls.desc.value ? datos.form.controls.desc.value : ' '
  information.fecha = this.fecha

  Swal.fire( { title: 'Espere', icon: 'info', text: 'Guardando información' } );
  Swal.showLoading();
  let peticion: Observable<any>;

  peticion = this._rest.postInfo( information );

  peticion.subscribe( resp => {

   Swal.fire( { title: 'Registrado', icon: 'success', text: 'Se actualizo Correctamente' } );
  } );

 }

 loadDataToForm(){
  this.eje = this.loadData.eje;
  this.dir = this.loadData.direccion;
  this.predial = this.loadData.predial;
  this.destino = this.loadData.destino;
  this.actividad = this.loadData.actividad;
  this.estrato = this.loadData.estrato;
  this.energia = this.loadData.energia;
  this.gas = this.loadData.gas;
  this.levantamiento = this.loadData.levantamiento;
  this.descripcion = this.loadData.descripcion;
 }

}
