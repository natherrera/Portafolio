import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentProductoComponent} from '../../modalVistas/DialogContentProducto/dialogContentProducto.component';
import { products } from '../../../../../utils/mock-responses/producto/productsResponse';

@Component({
  selector: 'app-vistaproducto',
  templateUrl: './vistaproducto.component.html',
  styleUrls: ['./vistaproducto.component.css']
})
export class VistaproductoComponent implements OnInit
{
  displayedColumnsProducto: string[] = ['select', 'id', 'nombreProducto', 'valor', 'tipoProducto', 'receta', 'verReceta'];
  dataSourceProducto = new MatTableDataSource<any>(products);
  selection = new SelectionModel<any>(true, []);

  constructor (public dialog: MatDialog) { }


  ngOnInit(): void
  {
  }

  openDialog(element: any) {
    let DialogContentComponent = DialogContentProductoComponent;
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
