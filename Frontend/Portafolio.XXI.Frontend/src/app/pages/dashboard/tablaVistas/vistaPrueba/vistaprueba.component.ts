import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Prueba } from '../../../../../utils/mock-responses/test/testResponse';
import { DialogModificarPruebaComponent } from '../../modalVistas/DialogPrueba/modificar/dialogModificarPrueba.component';
import { DialogVerPruebaComponent } from '../../modalVistas/DialogPrueba/ver/dialogVerPrueba.component';
import { ngfactoryFilePath } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-vistaprueba',
  templateUrl: './vistaprueba.component.html',
  styleUrls: ['./vistaprueba.component.css']
})

export class VistapruebaComponent implements OnInit
{

  dataSourcePrueba = new MatTableDataSource<any>(Prueba);
  displayedColumnsPrueba: string[] = ['select', 'id', 'nombre', 'edad', 'modificar', 'ver'];
  selection = new SelectionModel<any>(true, []);

  constructor (public dialog: MatDialog) { }


  ngOnInit(): void
  {
  }

  openDialog(tipo: string, element: any) {
    let DialogContentComponent;

    switch (tipo) {
      case 'modificar':
        DialogContentComponent = DialogModificarPruebaComponent;
        break;

        case 'ver':
        DialogContentComponent = DialogVerPruebaComponent;
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
