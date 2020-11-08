import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentMesaComponent} from './DialogContentMesa/dialogContentMesa.component';
import {DialogContentCocinaComponent} from './DialogContentCocina/dialogContentCocina.component';
import {DialogContentPagoComponent} from './DialogContentPago/dialogContentPago.component';
import {DialogContentPedidoComponent} from './DialogContentPedido/dialogContentPedido.component';
import { MESAS_DATA } from '../../../utils/mock-responses/mesas/mesasResponse';
import { COCINA_DATA } from '../../../utils/mock-responses/cocina/cocinaResponse';
import { PAGO_DATA } from '../../../utils/mock-responses/pago/pagoResponse';
import { PEDIDO_DATA } from '../../../utils/mock-responses/pedidos/pedidosResponse';
import { Mesas } from '../../../utils/mock-core/models/mesas.model';
import { Cocina } from '../../../utils/mock-core/models/cocina.model';
import { Pago } from '../../../utils/mock-core/models/pago.model';
import { Pedido } from '../../../utils/mock-core/models/pedido.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-panelmesero',
  templateUrl: './panelMesero.component.html',
  styleUrls: ['./panelMesero.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PanelMeseroComponent implements OnInit
{
  displayedColumnsMesas: string[] = ['select', 'id', 'mesa', 'ubicacion', 'estado', 'modificar'];

  displayedColumnsCocina: string[] = ['select', 'id', 'mesa', 'idCliente', 'fecha', 'hora', 'estadoPreparacion', 'modificar'];

  displayedColumnsPago: string[] = ['select', 'id', 'mesa', 'tipoPago', 'idCliente', 'fecha','hora', 'total','estado', 'modificar'];

  displayedColumnsPedido: string[] = ['select', 'id', 'mesa', 'tipoEntrega', 'idCliente', 'fecha','hora', 'estadoPreparacion','subtotal', 'total'];

  dataSourceMesas = new MatTableDataSource<Mesas>(MESAS_DATA);
  dataSourceCocina = new MatTableDataSource<Cocina>(COCINA_DATA);
  dataSourcePago = new MatTableDataSource<Pago>(PAGO_DATA);
  dataSourcePedido = new MatTableDataSource<Pedido>(PEDIDO_DATA);
  expandedElementPedido: string[] = ['Comestibles', 'Bebestibles'];

  selection = new SelectionModel<any>(true, []);

  constructor (public dialog: MatDialog) { }

  ngOnInit(): void
  {
  }

  openDialog(tipo: string, element: any) {
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
      case 'pedido':
         DialogContentComponent = DialogContentPedidoComponent;
         break;

      default:
        break;
    }
    const dialogRef = this.dialog.open(DialogContentComponent, {data: element});
    dialogRef.afterClosed().subscribe(result => {
      // console.log('Resultado de modal de ' + tipo + ':', result)
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
