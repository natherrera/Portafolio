import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { Router } from "@angular/router";
import { products } from 'src/utils/mock-responses/producto/productsResponse';
import { getLocaleTimeFormat } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-restaurantrightsidebar',
  templateUrl: './restaurantrightsidebar.component.html',
  styleUrls: ['./restaurantrightsidebar.component.css']
})
export class RestaurantrightsidebarComponent implements OnInit {

  constructor(private storageService: StorageService, private router: Router) { }

  @Input() message: string;
  @Input() wishList: any;
  @Input() orden: any;
  @Input() subTotal: number;
  @Input() route: string;
  fecha: string;
  hora: string;
  @Input() deleteProductWishList: (args: any) => void;


  ngOnInit(): void {
  }


  handleClickConfirm(){
    if(this.wishList.length > 0) {
      this.message = "";
      this.orden.pedido = this.wishList;
      this.orden.subtotal = this.subTotal;
      // this.orden.propina = this.subTotal * 0.1;
      this.storageService.setCurrentOrder(this.orden);
      this.router.navigate([this.route]);
    } else {
      this.message = "No hay productos";
    }
  }

}
