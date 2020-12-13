import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentMesaComponent} from '../../modalVistas/DialogContentMesa/dialogContentMesa.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';
import { Shared } from '../../../../../utils/shared/shared';

@Component({
  selector: 'app-vistamesas',
  templateUrl: './vistaMesas.component.html',
  styleUrls: ['./vistamesas.component.css']
})
export class VistamesasComponent implements OnInit
{
  displayedColumnsMesas: string[] = ['select', 'id', 'mesa', 'capacidad', 'ubicacion', 'estado', 'modificar'];
  dataSourceMesas = new MatTableDataSource<any>();
  listaMesas: any;
  selection = new SelectionModel<any>(true, []);
  public crearMesaForm: FormGroup;
  constructor (public dialog: MatDialog, private formBuilder: FormBuilder,private storageService: StorageService, private shared: Shared) { }


  ngOnInit(): void
  {
    this.getMesas();
    this.crearMesaForm = this.formBuilder.group({
      mesa: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidad: ['', Validators.required],
      estado: ['', Validators.required]
    })
  }

  public crearMesa()
  {
    if (this.crearMesaForm.valid)
    {
      let mesa = this.crearMesaForm.value;
      mesa.id = this.shared.crearId(this.listaMesas);
      this.storageService.insertMesa(mesa);
      this.crearMesaForm.reset();
      this.getMesas();
    }
  }



  getMesas() {
    this.listaMesas = JSON.parse(this.storageService.getCurrentMesas());
    this.dataSourceMesas = new MatTableDataSource<any>(this.listaMesas);
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
