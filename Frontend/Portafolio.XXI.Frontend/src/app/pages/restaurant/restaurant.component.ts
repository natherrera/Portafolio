import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { StorageService } from '../../../services/storage.service';
import { FormBuilder, Validators } from "@angular/forms";
import { MESAS_DATA } from '../../../utils/mock-responses/mesas/mesasResponse';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit
{
  [x: string]: any;

  public message: string;
  public products: any;
  public drinks: any;
  public dishes: any;
  public subTotal: number = 0;
  public error: { code: number, message: string } = null;
  public loading = false;
  public tipoAtencion: string;
  public mesa: string;
  public wishList: Array<any> = [];
  public orden: any = {};
  listaMesas: any = MESAS_DATA;
  selectedTypeAttention: string;
  tipoOrdenList: Array<Object> = [{value:'local',viewValue:'Atención en el local'}, {value:'retiro',viewValue:'Retiro en tienda'}];
  mesasDisponibles: Array<Object> = [{id: "1", mesa: "1", ubicacion: "entrada", estado: true},{id: "2", mesa: "2", ubicacion: "pasillo", estado: true},{id: "3", mesa: "3", ubicacion: "pasillo", estado: true},{id: "4", mesa: "4", ubicacion: "ventana", estado: true}]



  constructor (private productService: ProductService, private storageService: StorageService, public fb: FormBuilder) { }

  ngOnInit(): void
  {
    this.getProducts();
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.setOrdenForm.controls[controlName].hasError(errorName);
  }

  handleChangeTipoAtencion = (e) => {
   this.tipoAtencion = e.value;
   this.orden.tipoAtencion = e.value;
  }

  handleChangeMesa = (e) => {
    this.mesa = e.value;
    this.orden.mesa = e.value;
  }

  handleClickProduct = (producto: any) =>
  {
    if (this.wishList.length > 0)
    {
      const idExiste = this.wishList.filter(x => x.id === producto.id);
      if (idExiste.length > 0)
      {
        this.wishList.map((e) =>
        {
          if (e.id === producto.id)
          {
            e.cantidad += 1;
            e.total += producto.valor;
          }
        })
      } else
      {
        producto.cantidad = 1;
        producto.total = producto.valor;
        this.wishList.push(producto);
      };
    } else
    {
      this.message = "";
      producto.cantidad = 1;
      producto.total = producto.valor;
      this.wishList.push(producto);
    }
    this.subTotal += producto.valor;
  }

  deleteProductWishList = (producto: any): void =>
  {
    this.wishList.map((e) =>
    {
      if (e.id === producto.id)
      {
        if (e.cantidad > 1)
        {
          e.cantidad -= 1;
          e.total -= producto.valor;
        } else
        {
          this.wishList = this.wishList.filter(i => i !== e)
        }
      }
    })

    this.subTotal -= producto.valor;
  }

  private getProducts()
  {
    this.productService.getAllProducts().subscribe(
      data => this.storageAndFilterData(data),
      error =>
      {
        this.error = error;
        this.loading = false;
      }
    );
  }

  private storageAndFilterData(data: any)
  {

    this.storageService.setCurrentProducts(data);
    this.products = data;
    this.drinks = data.filter(x => x.tipoProducto === 'Bebestible');
    this.dishes = data.filter(x => x.tipoProducto === 'Comestible');
  }

}
