import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentMesaComponent} from './DialogContentMesa/dialogContentMesa.component';
import {DialogContentCocinaComponent} from './DialogContentCocina/dialogContentCocina.component';
import {DialogContentPagoComponent} from './DialogContentPago/dialogContentPago.component';
import { MESAS_DATA } from '../../../utils/mock-responses/mesas/mesasResponse';
import { COCINA_DATA } from '../../../utils/mock-responses/cocina/cocinaResponse';
import { PAGO_DATA } from '../../../utils/mock-responses/pago/pagoResponse';
import { Mesas } from '../../../utils/mock-core/models/mesas.model';
import { Cocina } from '../../../utils/mock-core/models/cocina.model';
import { Pago } from '../../../utils/mock-core/models/pago.model';

@Component({
  selector: 'app-panelmesero',
  templateUrl: './panelMesero.component.html',
  styleUrls: ['./panelMesero.component.css']
})

export class PanelMeseroComponent implements OnInit
{
  displayedColumnsMesas: string[] = ['select', 'id', 'mesa', 'ubicacion', 'estado', 'modificar'];
  displayedColumnsCocina: string[] = ['select', 'id', 'mesa', 'idCliente', 'fecha', 'hora', 'estadoPreparacion', 'modificar'];
  displayedColumnsPago: string[] = ['select', 'id', 'mesa', 'tipoPago', 'idCliente', 'fecha','hora', 'total','estado', 'modificar'];
  dataSourceMesas = new MatTableDataSource<Mesas>(MESAS_DATA);
  dataSourceCocina = new MatTableDataSource<Cocina>(COCINA_DATA);
  dataSourcePago = new MatTableDataSource<Pago>(PAGO_DATA);
  selection = new SelectionModel<Mesas>(true, []);

  constructor (public dialog: MatDialog) { }

  ngOnInit(): void
  {
  }

  openDialog(tipo: string, element: any) {
    console.log('element: ', element, tipo);
    let DialogContentComponent = null;
    switch (tipo) {
      case 'mesa':
         DialogContentComponent = DialogContentMesaComponent;
         break;

      case 'cocina':
         DialogContentComponent = DialogContentCocinaComponent;
         break;

      case 'pago':
         DialogContentComponent = DialogContentPagoComponent;
         break;

      default:
        break;
    }
    const dialogRef = this.dialog.open(DialogContentComponent, {data: element});
    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado de modal de ' + tipo + ':', result)
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(dataSource: any) {
    const numSelected = this.selection.selected.length;
    const numRows = dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(dataSource: any) {
    this.isAllSelected(dataSource) ?
        this.selection.clear() :
        dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any, dataSource?: any ): string {
    if (!row) {
      return `${this.isAllSelected(dataSource) ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${+row.id + 1}`;
  }

}
