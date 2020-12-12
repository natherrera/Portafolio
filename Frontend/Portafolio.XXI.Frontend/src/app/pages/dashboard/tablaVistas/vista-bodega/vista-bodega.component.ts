import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from 'src/services/storage.service';
import { Insumo } from 'src/utils/mock-core/models/insumo.model';
import { DialogContentActivoComponent } from '../../modalVistas/DialogContentBodega/activos/dialog-content-activo.component';
import { DialogContentBodegaComponent } from '../../modalVistas/DialogContentBodega/DialogContentBodega.component';

@Component({
  selector: 'app-vista-bodega',
  templateUrl: './vista-bodega.component.html',
  styleUrls: ['./vista-bodega.component.css']
})
export class VistaBodegaComponent implements OnInit {

  dataSourceInsumo: any;
  dataSourceActivo: any;
  dataSourceSalida: any;
  displayedColumnsInsumo: string[] = ['id', 'nombreInsumo', 'marca', 'tipoInsumo',  'unidadMedida', 'cantidad', 'modificar', 'eliminar'];
  displayedColumnsActivo: string[] = ['id', 'nombreActivo', 'tipoActivo', 'cantidad', 'modificar', 'eliminar'];
  displayedColumns: string[] = ['insumo', 'cantidad', 'unidadMedida'];
  dataSource: any = [];
  agregarInsumoForm: FormGroup;
  infoCotizacionForm: FormGroup;
  hasData: boolean;
  public insumos: Insumo[] = [];
  public activos: any = [];

  constructor (
    public dialog: MatDialog,
    private storageService: StorageService,
    private formBuilder: FormBuilder
    ) { }


  ngOnInit(): void
  {
    debugger;
    this.getData();
    this.agregarInsumoForm = this.formBuilder.group({
      insumo: [''],
      cantidad: [''],
      unidadMedida: [''],
    });
    this.infoCotizacionForm = this.formBuilder.group({
      proveedor: [''],
      fechaEntrega: [''],
    });
  }

  getData() {
    this.insumos = JSON.parse(this.storageService.getCurrentInsumo());
    this.dataSourceInsumo = new MatTableDataSource<any>(this.insumos);
    this.activos = JSON.parse(this.storageService.getCurrentActivo());
    this.dataSourceActivo = new MatTableDataSource<any>(this.activos);
  }

  openDialog(tipo: string, element: any) {
    debugger;
    let DialogContentComponent = null;
    DialogContentComponent = tipo == "alimento" ? DialogContentBodegaComponent : DialogContentActivoComponent;
    const dialogRef = this.dialog.open(DialogContentComponent, {data: element});
    dialogRef.afterClosed().subscribe(result => {
      // console.log('Resultado de modal de ' + tipo + ':', result)
    });
  }

  delete(element: any, opt: number){
    if(opt == 1){
      this.insumos.splice(this.insumos.indexOf(element),1);
      this.dataSourceInsumo = new MatTableDataSource<any>(this.insumos);
    }
    else if (opt == 2){
      this.activos.splice(this.activos.indexOf(element),1);
      this.dataSourceActivo = new MatTableDataSource<any>(this.activos);
    }
  }

  agregarInsumo = () =>
  {
    const form = this.agregarInsumoForm.value;
    const insumo = {
      insumo: form.insumo,
      cantidad: form.cantidad,
      unidadMedida: form.unidadMedida
    }
    const wishlist = [];
    wishlist.push(insumo);
    this.dataSource = new MatTableDataSource(wishlist);
    this.agregarInsumoForm.reset();
    this.hasData = true;
  }

}
