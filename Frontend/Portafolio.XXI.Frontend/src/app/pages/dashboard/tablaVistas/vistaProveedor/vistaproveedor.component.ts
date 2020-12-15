import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentProveedorComponent} from '../../modalVistas/DialogContentProveedor/dialogContentProveedor.component';
import { PROVEEDOR } from '../../../../../utils/mock-responses/proveedor/proveedorResponse';
import { Proveedor } from '../../../../../utils/mock-core/models/proveedor.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-vistaproveedor',
  templateUrl: './vistaproveedor.component.html',
  styleUrls: ['./vistaproveedor.component.css']
})
export class VistaproveedorComponent implements OnInit
{
  displayedColumnsProveedor: string[] = ['select', 'id', 'nombreProveedor', 'tipoProveedor','modificar'];
  dataSourceProveedor: any;
  selection = new SelectionModel<Proveedor>(true, []);
  public crearProveedorForm: FormGroup;
  public proveedor: any = {};
  public PROVEEDOR: any = [];
  


  constructor (public dialog: MatDialog, private formBuilder: FormBuilder,private storageService: StorageService,) { }


  ngOnInit(): void
  {
    this.getProveedor();
    this.crearProveedorForm = this.formBuilder.group({
      nombreProveedor: ['', Validators.required],
      tipoProveedor: ['', Validators.required]
    })
  }

  public crearProveedor()
  {
    if (this.crearProveedorForm.valid)
    {
      this.storageService.insertProveedor(this.crearProveedorForm.value);
      this.crearProveedorForm.reset();
      this.getProveedor();
    }
  }

  getProveedor() {
    this.PROVEEDOR = JSON.parse(this.storageService.getCurrentProveedor());
    this.dataSourceProveedor = new MatTableDataSource<any>(this.PROVEEDOR);
  }

  openDialog(tipo: string, element: any) {
    let DialogContentComponent = DialogContentProveedorComponent;
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
