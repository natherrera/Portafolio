import { Component, OnInit, Input } from '@angular/core';
import { products } from 'src/utils/mock-responses/orders/productsResponse';
import { ProductService } from '../../../services/product.service';
import { StorageService } from '../../../services/storage.service';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit
{
  [x: string]: any;

  public products: any;
  public drinks: any;
  public dishes: any;
  public subTotal: number = 0;
  public error: { code: number, message: string } = null;
  public loading = false;
  public wishList: Array<any> = [];

  constructor (private productService: ProductService, private storageService: StorageService,) { }

  ngOnInit(): void
  {
    this.getProducts();
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
      producto.cantidad = 1;
      producto.total = producto.valor;
      this.wishList.push(producto);
    }
    this.subTotal += producto.valor;
  }

  deleteProductWishList = (producto: any) : void =>
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
