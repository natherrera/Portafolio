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

  @Input() message: string;
  @Input() wishList: any;
  @Input() subTotal: number;
  @Input() route: string;
  @Input() deleteProductWishList: (args: any) => void;

  ngOnInit(): void {
  }

  handleClickConfirm(){
    console.log('click to confirm');
    if(this.wishList.length > 0) {
      this.message = "";
      this.storageService.setCurrentOrder(this.wishList);
      this.router.navigate([this.route]);
    } else {
      this.message = "No hay productos";
    }

  }

}
