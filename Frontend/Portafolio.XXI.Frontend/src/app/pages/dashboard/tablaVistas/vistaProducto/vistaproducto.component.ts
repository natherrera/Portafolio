import { Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {DialogContentProductoComponent} from '../../modalVistas/DialogContentProducto/dialogContentProducto.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';
import { Insumo } from 'src/utils/mock-core/models/insumo.model';
import { Insumos2, Producto2 } from 'src/utils/mock-core/models/producto.model';
import { ToastrService } from 'ngx-toastr';

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
  public insumos: Insumo[] = [];
  agregarInsumoForm: FormGroup = new FormGroup ({
    insumo: new FormControl(),
    cantidad: new FormControl()
  });
  dataSource: any;
  hasData: boolean = false;
  displayedColumnsInsumo: string[] = ['insumo', 'cantidad'];
  wishlist: any = [];
  displayedColumnsProducto: string[] = ['id', 'nombreProducto', 'costo', 'valor', 'tipoProducto', 'verReceta'];
  dataSourceProducto: any;
  selection = new SelectionModel<any>(true, []);
  costo: number = 0;
  nuevoProducto = new Producto2();
  tipoId: string = "0";
  instrucciones: string = "";
  listaInsumos: Insumos2[] = [];
  insumo2 = new Insumos2();
  esBebida: boolean = false;
  selectedType: boolean = false;

  constructor (
    public dialog: MatDialog, 
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private toastr: ToastrService
    ) { }


  ngOnInit(): void
  {
    this.agregarInsumoForm = this.formBuilder.group({
      insumo: [''],
      cantidad: [''],
      unidadMedida: [''],
    });
    this.getProducts();
    this.crearProductoForm = this.formBuilder.group({
      nombreProducto: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      valorProducto: ['', Validators.required],
      costoProducto: ['', Validators.required],
      instrucciones: ['', Validators.required]
    })
  }

  getProducts() {
    this.productos = JSON.parse(this.storageService.getCurrentProducts());
    this.dataSourceProducto = new MatTableDataSource<any>(this.productos);
    this.insumos = JSON.parse(this.storageService.getCurrentInsumo());
  }

  openDialog(element: any) {
    let DialogContentComponent = DialogContentProductoComponent;
    const dialogRef = this.dialog.open(DialogContentComponent, {data: element});
    dialogRef.afterClosed().subscribe(result => {
      // console.log('Resultado de modal de ' + tipo + ':', result)
    });
  }

  agregarInsumo = () =>
  {
    const form = this.agregarInsumoForm.value;
    const insumo = {
      insumo: form.insumo,
      cantidad: form.cantidad,
      unidadMedida: form.unidadMedida
    }
    this.wishlist.push(insumo);
    this.insumos.forEach(item => {
      if(item.nombreInsumo == insumo.insumo){
        this.costo = this.costo + (item.costo * insumo.cantidad);
        this.insumo2.insumoId = this.productos.length + 1;
        this.insumo2.insumoNombre = item.nombreInsumo;
        this.insumo2.unidadMedida = this.tipoId == "Comestible" ? "Kilogramo" : "Litro";
        this.insumo2.cantidad = insumo.cantidad;
        this.listaInsumos.push(this.insumo2);
        this.insumo2 = new Insumos2();
      }
    });
    this.dataSource = new MatTableDataSource(this.wishlist);
    this.agregarInsumoForm.reset();
    this.hasData = true;
  }

  selecType(id: string){
    debugger;
    this.esBebida = id == "Comestible" ? false : true;
    this.selectedType = true;
  }

  crearProducto(){
    debugger;
    this.nuevoProducto.id = this.productos.length + 1;
    this.nuevoProducto.tipoProducto =  this.tipoId;
    this.nuevoProducto.costo = this.costo;
    this.nuevoProducto.imagen = "assets/img/dish/150x151/drink-1.jpg";
    this.nuevoProducto.receta.recetaid = this.productos.length + 1;
    this.nuevoProducto.receta.instrucciones = this.instrucciones;
    this.nuevoProducto.receta.listaInsumos = this.listaInsumos;
    this.productos.push(this.nuevoProducto);
    this.storageService.setCurrentProducts(this.productos);
    this.toastr.success("Producto Agregado");
    this.productos = JSON.parse(this.storageService.getCurrentProducts());
    this.nuevoProducto = new Producto2();
    this.wishlist = [];
    this.hasData = false;
    this.selectedType = false;
    this.costo = 0;
    this.tipoId = "0";
    this.dataSourceProducto = new MatTableDataSource(this.productos);
  }


}
