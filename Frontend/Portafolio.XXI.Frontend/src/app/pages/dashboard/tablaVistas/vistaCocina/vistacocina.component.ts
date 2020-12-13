import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentCocinaComponent} from '../../modalVistas/DialogContentCocina/dialogContentCocina.component';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-vistacocina',
  templateUrl: './vistacocina.component.html',
  styleUrls: ['./vistacocina.component.css']
})

export class VistacocinaComponent implements OnInit
{
  listaPedidos: any;
  dataSourceCocina = new MatTableDataSource<any>();
  displayedColumnsCocina: string[] = ['id', 'mesa', 'fecha', 'hora', 'estado', 'modificar'];
  selection = new SelectionModel<any>(true, []);


  constructor (public dialog: MatDialog, private storageService: StorageService) { }


  ngOnInit(): void
  {
    this.getPedidos();
  }

  
  getPedidos() {
    this.listaPedidos = JSON.parse(this.storageService.getCurrentPedido());
    this.dataSourceCocina = new MatTableDataSource<any>(this.listaPedidos);
  }


  openDialog(tipo: string, element: any) {
    let DialogContentComponent = DialogContentCocinaComponent;
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
