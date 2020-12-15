import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentCocinaComponent} from '../../modalVistas/DialogContentCocina/dialogContentCocina.component';
import { COCINA_DATA } from '../../../../../utils/mock-responses/cocina/cocinaResponse';
import { Cocina } from '../../../../../utils/mock-core/models/cocina.model';

@Component({
  selector: 'app-vistareservas',
  templateUrl: './vistareservas.component.html',
  styleUrls: ['./vistareservas.component.css']
})
export class VistareservasComponent implements OnInit
{
  displayedColumnsCocina: string[] = ['id', 'mesa', 'idCliente', 'fecha', 'hora', 'estadoPreparacion', 'modificar'];
  dataSourceCocina = new MatTableDataSource<Cocina>(COCINA_DATA);
  selection = new SelectionModel<Cocina>(true, []);

  constructor (public dialog: MatDialog) { }


  ngOnInit(): void
  {
  }

  openDialog(tipo: string, element: any) {
    let DialogContentComponent = DialogContentCocinaComponent;
    const dialogRef = this.dialog.open(DialogContentComponent, {data: element});
    dialogRef.afterClosed().subscribe(result => {
      // console.log('Resultado de modal de ' + tipo + ':', result)
    });
  }

}
