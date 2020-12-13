import { Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentInsumoComponent} from '../../modalVistas/DialogContentInsumo/dialogContentInsumo.component';
import { insumos } from '../../../../../utils/mock-responses/insumo/insumoResponse';
import { Insumo } from '../../../../../utils/mock-core/models/insumo.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-vistainsumos',
  templateUrl: './vistainsumos.component.html',
  styleUrls: ['./vistainsumos.component.css']
})
export class VistainsumosComponent implements OnInit
{
  displayedColumnsInsumo: string[] = ['select', 'id', 'nombreInsumo', 'marca', 'tipoInsumo', 'cantidad', 'costo', 'unidadMedida', 'modificar'];
  dataSourceInsumo: any;
  dataSourceTipoInsumo: any;//TODO TMV: Conseguir ecxplicación funcionamiento
  selection = new SelectionModel<Insumo>(true, []);
  public crearInsumoForm: FormGroup;
  public insumo: any = {};
  public insumos: any = [];
  public tipoInsumos: any = [];


  constructor (public dialog: MatDialog, private formBuilder: FormBuilder,private storageService: StorageService,) { }


  ngOnInit(): void
  {
    this.getTipoInsumo();
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
    }
  }

  getInsumos() {
    let insumoList = JSON.parse(this.storageService.getCurrentInsumo());

    insumoList.forEach(insumo => {
      let tipoInsumo = "";

      this.tipoInsumos.forEach(tipoInsumo_ => {
        if(tipoInsumo_.id == insumo.tipoInsumo){
          tipoInsumo = tipoInsumo_.nombre;
        }
      });
      insumo.tipoInsumo = tipoInsumo==""?insumo.tipoInsumo:tipoInsumo;

      this.insumos.push(insumo);
    });
    

    //this.insumos = JSON.parse(this.storageService.getCurrentInsumo());
    this.dataSourceInsumo = new MatTableDataSource<any>(this.insumos);
  }

  getTipoInsumo() {
    this.tipoInsumos = JSON.parse(this.storageService.getCurrentTipoInsumo());
    console.log(this.tipoInsumos);
    this.dataSourceTipoInsumo = new MatTableDataSource<any>(this.tipoInsumos);
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
