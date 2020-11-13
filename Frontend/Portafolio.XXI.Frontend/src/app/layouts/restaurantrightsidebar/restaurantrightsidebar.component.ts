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


  getTimeDate = () => {
    moment.locale('es');
    this.orden.fecha = moment().format('L');
    this.orden.hora = moment().format('LT');
  }

  handleClickConfirm(){
    if(this.wishList.length > 0) {
      const usuario = this.storageService.getCurrentUser();
      this.message = "";
      this.orden.id = 123434;
      this.orden.pedido = this.wishList;
      this.orden.usuario = usuario.name;
      this.getTimeDate();
      this.orden.subtotal = this.subTotal;
      this.orden.propina = this.subTotal * 0.1;
      console.log(this.orden)
      this.storageService.setCurrentOrder(this.orden);
      this.router.navigate([this.route]);
    } else {
      this.message = "No hay productos";
    }

  }

}
