import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentCocinaComponent} from '../../modalVistas/DialogContentCocina/dialogContentCocina.component';
import { COCINA_DATA } from '../../../../../utils/mock-responses/cocina/cocinaResponse';
import { Cocina } from '../../../../../utils/mock-core/models/cocina.model';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-vistacocina',
  templateUrl: './vistacocina.component.html',
  styleUrls: ['./vistacocina.component.css']
})

export class VistacocinaComponent implements OnInit
{
  dataSourceCocina = new MatTableDataSource<Cocina>(COCINA_DATA);
  displayedColumnsCocina: string[] = ['id', 'mesa', 'fecha', 'hora', 'estadoPreparacion', 'modificar'];
  selection = new SelectionModel<Cocina>(true, []);


  constructor (public dialog: MatDialog, private storageService: StorageService) { }


  ngOnInit(): void
  {
  }

  
  getPedidos() {
    let pedidosList = JSON.parse(this.storageService.getCurrentPedidos());
    this.dataSourceCocina = new MatTableDataSource<any>(pedidosList);
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
