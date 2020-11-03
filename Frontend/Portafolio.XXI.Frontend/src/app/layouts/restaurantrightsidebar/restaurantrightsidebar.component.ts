import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { Router } from "@angular/router";
import { products } from 'src/utils/mock-responses/orders/productsResponse';

@Component({
  selector: 'app-restaurantrightsidebar',
  templateUrl: './restaurantrightsidebar.component.html',
  styleUrls: ['./restaurantrightsidebar.component.css']
})
export class RestaurantrightsidebarComponent implements OnInit {

  constructor(private storageService: StorageService, private router: Router) { }

  @Input() wishList: any;
  @Input() subTotal: number;
  @Input() deleteProductWishList: (args: any) => void;

  ngOnInit(): void {
  }

  // deleteProductWishList = (product: any) => {

  //   this.wishList.map((e) => {if(e.id === product.id){
  //     if(e.cantidad > 1) {
  //       e.cantidad -= 1;
  //     } else {
  //       this.wishList = this.wishList.filter(i => i !== e )
  //     }
  //   }})

  //   this.subTotal -= product.valor;
  // }

  private handleClickConfirm(data: any, route: string){

    this.storageService.setCurrentOrder(data);
    this.router.navigate([route]);

  }

}
