import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentCocinaComponent} from '../../modalVistas/DialogContentCocina/dialogContentCocina.component';
import { trabajador } from '../../../../../utils/mock-responses/trabajador/trabajadorResponse';
import { Trabajador } from '../../../../../utils/mock-core/models/trabajador.model';

// @Component({
//   selector: 'app-vistatrabajador',
//   templateUrl: './vistatrabajador.component.html',
//   styleUrls: ['./vistatrabajador.component.css']
// // })
// export class VistatrabajadorComponent implements OnInit
// {
//   displayedColumnsTrabajador: string[] = ['select', 'rut', 'nombre', 'apellidoMaterno', 'apellidoPaterno', 'fechaNacimiento', 'sexo', 'usuario', 'email' , 'modificar'];
//   dataSourceTrabajador = new MatTableDataSource<Trabajador>(trabajador);
//   selection = new SelectionModel<Trabajador>(true, []);

//   constructor (public dialog: MatDialog) { }


//   ngOnInit(): void
//   {
//   }

//   openDialog(tipo: string, element: any) {
//     let DialogContentComponent = DialogContentCocinaComponent;
//     const dialogRef = this.dialog.open(DialogContentComponent, {data: element});
//     dialogRef.afterClosed().subscribe(result => {
//       // console.log('Resultado de modal de ' + tipo + ':', result)
//     });
//   }

//   isAllSelected(dataSource: any) {
//     const numSelected = this.selection.selected.length;
//     const numRows = dataSource.data.length;
//     return numSelected === numRows;
//   }

//   masterToggle(dataSource: any) {
//     this.isAllSelected(dataSource) ?
//         this.selection.clear() :
//         dataSource.data.forEach(row => this.selection.select(row));
//   }

//   checkboxLabel(row?: any, dataSource?: any ): string {
//     if (!row) {
//       return `${this.isAllSelected(dataSource) ? 'select' : 'deselect'} all`;
//     }
//     return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${+row.id + 1}`;
//   }


// }
