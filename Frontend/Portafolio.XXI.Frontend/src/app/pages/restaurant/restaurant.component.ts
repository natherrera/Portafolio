import { Component, OnInit } from '@angular/core';
import { products } from 'src/utils/mock-responses/orders/productsResponse';
import { ProductService } from '../../../services/product.service';
import { StorageService } from '../../../services/storage.service';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  [x: string]: any;

  public products: any;
  public drinks: any;
  public dishes: any;
  public subTotal: number;
  public error: {code: number, message: string} = null;
  public loading = false;
  public wishList: any;

  constructor(private productService: ProductService, private storageService: StorageService,) { }

  ngOnInit(): void {
    this.getProducts();
  }

  private handleClickProduct(product: any) {
    this.wishList.map((x) => {
      if(x.id === product.id) {
        x.cantidad += 1;
      } else {
        this.wishList.push(product);
      };
    });
    this.setSubtotal(product.valor, 'sumar');
  }

  private deleteProductWishList(id: number){
    const removeProduct = (id: number) => {
      this.wishList = this.wishList.filter(e => e.id === id);
    }

    this.wishList.map((e) => {
      if(e.id === id) {
        this.setSubtotal(e.valor, 'restar');
        if(e.cantidad > 1) {
          e.cantidad -= 1
        } else {
          removeProduct(e.id);
        }
      }
    });
  }

  private getProducts() {
    this.productService.getAllProducts().subscribe(
      data => this.storageData(data),
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  private setSubtotal(productPrice: number, operacion: string) {
    if(operacion === 'sumar') {
      this.subTotal =+ productPrice;
    } if(operacion === 'restar') {
      this.subTotal =- productPrice;
    }
  }

  private storageData(data: any){

    this.storageService.setCurrentProducts(data);
    this.products = data;
    this.drinks = data.filter(x => x.tipoProducto === 'Bebestible');
    this.dishes = data.filter(x => x.tipoProducto === 'Comestible');
  }

}
