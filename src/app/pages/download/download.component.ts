import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import * as XLSX from 'xlsx';
import {FilterByPipe} from 'ngx-pipes';
import moment from 'moment';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
  providers: [FilterByPipe]
})
export class DownloadComponent implements OnInit {
  public infoarray:any[];
  public allinfoarray:any[];
  public localidad: string;
  public ffin: Date;
  public fini: Date;
  fileName = `Registro`;

  constructor(private _rest: RestService) { }

  ngOnInit(): void {
   this._rest.getInfo().subscribe(op => {
      this.infoarray = op
      this.allinfoarray = op
    });
  }

  onSubmit(datos){

    this._rest.getInfo(this.fini, this.ffin).subscribe(op => {
      this.infoarray = op
      this.allinfoarray = op
    });
  }

 exportexcel(): void
 {

    /* table id is passed over here */
    let element = document.getElementById('excel-table');

    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName+moment().format("Do MMM YY")+'.xlsx');

 }
}
