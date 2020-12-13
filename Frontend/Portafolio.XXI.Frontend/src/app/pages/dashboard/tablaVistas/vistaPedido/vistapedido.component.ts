import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import {DialogModificarComponent} from '../../modalVistas/DialogPedido/modificar/dialogModificar.component';
import {DialogVerComponent} from '../../modalVistas/DialogPedido/ver/dialogVer.component';
import { PEDIDO_DATA } from '../../../../../utils/mock-responses/pedidos/pedidosResponse';
import { PedidoCabecera } from '../../../../../utils/mock-core/models/pedido.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-vistapedido',
  templateUrl: './vistapedido.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VistapedidoComponent implements OnInit
{
  displayedColumnsPedido: string[] = ['id', 'mesa', 'tipoAtencion', 'fecha','hora', 'estadoPreparacion', 'subTotal', 'ver'];
  dataSourcePedido = new MatTableDataSource<PedidoCabecera>(PEDIDO_DATA);
  pedidos: any = [];
  selection = new SelectionModel<PedidoCabecera>(true, []);

  constructor (
    public dialog: MatDialog,
    private storageService: StorageService
    ) { }


  ngOnInit(): void
  {
    this.getData();
  }

  getData() {
    this.pedidos = JSON.parse(this.storageService.getCurrentPedidos());
    this.dataSourcePedido = new MatTableDataSource<any>(this.pedidos);
  }

  openDialog(element: any, type: string) {
    let DialogContentComponent;
    switch (type) {
      case 'modificar':
        DialogContentComponent = DialogModificarComponent;
        console.log('modificar');
        break;

        case 'ver':
          DialogContentComponent = DialogVerComponent;
          console.log('ver');
          break;

      default:
        break;
    }
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
