import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit
{

  constructor (private storageService: StorageService, private router: Router) { }
  orden: any;
  products: any = [];
  navigationExtras: NavigationExtras;

  ngOnInit(): void
  {
    const data: any = this.storageService.getCurrentOrder();
    this.orden = JSON.parse(data);
    this.navigationExtras = JSON.parse(data);
    this.products = this.orden.pedido;
    console.log(this.orden)
  }

  redirect = (route: string) =>
  {
    this.router.navigate(
      [route], this.navigationExtras,
    );
  }

}
