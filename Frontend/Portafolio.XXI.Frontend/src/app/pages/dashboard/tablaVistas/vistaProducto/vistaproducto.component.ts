import { Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentProductoComponent} from '../../modalVistas/DialogContentProducto/dialogContentProducto.component';
import { products } from '../../../../../utils/mock-responses/producto/productsResponse';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-vistaproducto',
  templateUrl: './vistaproducto.component.html',
  styleUrls: ['./vistaproducto.component.css']
})
export class VistaproductoComponent implements OnInit
{
  public crearProductoForm: FormGroup;
  public producto: any = {};
  public productos: any = [];

  displayedColumnsProducto: string[] = ['select', 'id', 'nombreProducto', 'valor', 'tipoProducto', 'receta', 'verReceta'];
  dataSourceProducto: any;
  selection = new SelectionModel<any>(true, []);

  constructor (public dialog: MatDialog, private formBuilder: FormBuilder,
    private storageService: StorageService,) { }


  ngOnInit(): void
  {
    this.getProducts();
    this.crearProductoForm = this.formBuilder.group({
      nombreProducto: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipoProducto: ['', Validators.required]
    })
  }

  public crearProducto()
  {
    if (this.crearProductoForm.valid)
    {
      this.storageService.insertProduct(this.crearProductoForm.value);
    }
  }

  getProducts() {
    this.productos = JSON.parse(this.storageService.getCurrentProducts());
    this.dataSourceProducto = new MatTableDataSource<any>(this.productos);
  }

  openDialog(element: any) {
    let DialogContentComponent = DialogContentProductoComponent;
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
