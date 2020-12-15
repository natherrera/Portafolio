import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentTrabajadorComponent} from '../../modalVistas/DialogContentTrabajador/dialogContentTrabajador.component';
import { trabajadors } from '../../../../../utils/mock-responses/trabajador/trabajadorResponse';
import { Trabajador } from '../../../../../utils/mock-core/models/trabajador.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-vistatrabajador',
  templateUrl: './vistatrabajador.component.html',
  styleUrls: ['./vistatrabajador.component.css']
})
export class VistatrabajadorComponent implements OnInit
{

  displayedColumnsTrabajador: string[] = ['select', 'rut', 'nombre', 'apellidoMaterno', 'apellidoPaterno', 'fechaNacimiento', 'sexo', 'usuario', 'email', 'modificar'];
  dataSourceTrabajador: any;
  selection = new SelectionModel<Trabajador>(true, []);
  public crearTrabajadorForm: FormGroup;
  public trabajador: any = {};
  public trabajadors: any = [];


  constructor (public dialog: MatDialog, private formBuilder: FormBuilder,private storageService: StorageService,) { }


  ngOnInit(): void
  {
    this.getTrabajador();
    this.crearTrabajadorForm = this.formBuilder.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', Validators.required]
    })
  }
  
  public crearTrabajador()
  {
    if (this.crearTrabajadorForm.valid)
    {
      this.storageService.insertTrabajador(this.crearTrabajadorForm.value);
      this.crearTrabajadorForm.reset();
      this.getTrabajador();
    }
  }

  getTrabajador() {
    this.trabajadors = JSON.parse(this.storageService.getCurrentTrabajador());
    this.dataSourceTrabajador = new MatTableDataSource<any>(this.trabajadors);
  }
  
  openDialog(tipo: string, element: any) {
    let DialogContentComponent = DialogContentTrabajadorComponent;
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
