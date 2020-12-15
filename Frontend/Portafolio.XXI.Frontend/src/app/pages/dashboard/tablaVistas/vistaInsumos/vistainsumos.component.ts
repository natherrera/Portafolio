import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentInsumoComponent} from '../../modalVistas/DialogContentInsumo/dialogContentInsumo.component';
import { insumos } from '../../../../../utils/mock-responses/insumo/insumoResponse';
import { Insumo } from '../../../../../utils/mock-core/models/insumo.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';
import { Shared } from '../../../../../utils/shared/shared';

@Component({
  selector: 'app-vistainsumos',
  templateUrl: './vistainsumos.component.html',
  styleUrls: ['./vistainsumos.component.css']
})
export class VistainsumosComponent implements OnInit
{
  public crearInsumoForm: FormGroup;
  public insumo: any = {};
  public insumos: any = [];

  displayedColumnsInsumo: string[] = ['select', 'id', 'nombreInsumo', 'marca', 'tipoInsumo', 'cantidad', 'costo', 'unidadMedida', 'modificar'];
  dataSourceInsumo: any;
  selection = new SelectionModel<Insumo>(true, []);

  constructor (public dialog: MatDialog, private formBuilder: FormBuilder,private storageService: StorageService,) { }


  ngOnInit(): void
  {
    this.getInsumos();
    this.crearInsumoForm = this.formBuilder.group({
      nombreInsumo: ['', Validators.required],
      marca: ['', Validators.required],
      tipoInsumo: ['', Validators.required],
      cantidad: ['', Validators.required],
      costo: ['', Validators.required],
      unidadMedida: ['', Validators.required]
    })
  }

  public crearInsumo()
  {
    if (this.crearInsumoForm.valid)
    {

      this.storageService.insertInsumo(this.crearInsumoForm.value);
      this.crearInsumoForm.reset();
      this.getInsumos();
    }
  }

  getInsumos() {
    let insumos = JSON.parse(this.storageService.getCurrentInsumo());
    this.dataSourceInsumo = new MatTableDataSource<any>(insumos);
  }

  openDialog(tipo: string, element: any) {
    let DialogContentComponent = DialogContentInsumoComponent;
    
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
