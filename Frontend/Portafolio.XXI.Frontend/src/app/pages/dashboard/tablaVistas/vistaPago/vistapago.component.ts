import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentPagoComponent} from '../../modalVistas/DialogContentPago/dialogContentPago.component';
import { PAGO_DATA } from '../../../../../utils/mock-responses/pago/pagoResponse';
import { Pago } from '../../../../../utils/mock-core/models/pago.model';

@Component({
  selector: 'app-vistapago',
  templateUrl: './vistapago.component.html',
})
export class VistapagoComponent implements OnInit
{
  displayedColumnsPago: string[] = ['select', 'id', 'mesa', 'tipoPago', 'idCliente', 'fecha','hora', 'total','estado', 'modificar'];
  dataSourcePago = new MatTableDataSource<Pago>(PAGO_DATA);
  selection = new SelectionModel<Pago>(true, []);

  constructor (public dialog: MatDialog) { }


  ngOnInit(): void
  {
  }

  openDialog(tipo: string, element: any) {
    let DialogContentComponent = DialogContentPagoComponent;
    const dialogRef = this.dialog.open(DialogContentComponent, {data: element});
    dialogRef.afterClosed().subscribe(result => {
      // console.log('Resultado de modal de ' + tipo + ':', result)
    });
  }

  isAllSelected(dataSource: any) {
    const numSelected = this.selection.selected.length;
    const numRows = dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(dataSource: any) {
    this.isAllSelected(dataSource) ?
        this.selection.clear() :
        dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any, dataSource?: any ): string {
    if (!row) {
      return `${this.isAllSelected(dataSource) ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${+row.id + 1}`;
  }

}
