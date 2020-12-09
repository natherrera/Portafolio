import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentMesaComponent} from '../../modalVistas/DialogContentMesa/dialogContentMesa.component';
import { MESAS_DATA } from '../../../../../utils/mock-responses/mesas/mesasResponse';
import { Mesas } from '../../../../../utils/mock-core/models/mesas.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-vistamesas',
  templateUrl: './vistaMesas.component.html',
  styleUrls: ['./vistamesas.component.css']
})
export class VistamesasComponent implements OnInit
{
  displayedColumnsMesas: string[] = ['select', 'id', 'mesa', 'capacidad', 'ubicacion', 'estado', 'modificar'];
  dataSourceMesas = new MatTableDataSource<Mesas>(MESAS_DATA);
  selection = new SelectionModel<Mesas>(true, []);
  public crearMesaForm: FormGroup;
  constructor (public dialog: MatDialog, private formBuilder: FormBuilder,private storageService: StorageService,) { }


  ngOnInit(): void
  {
    this.crearMesaForm = this.formBuilder.group({
      nombreMesa: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidad: ['', Validators.required]
    })
  }

  public crearMesa()
  {
    console.log('crear mesa');
  }

  openDialog(tipo: string, element: any) {
    let DialogContentComponent =  DialogContentMesaComponent;

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
