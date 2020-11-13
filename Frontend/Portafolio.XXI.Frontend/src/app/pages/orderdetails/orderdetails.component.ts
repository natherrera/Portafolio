import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  constructor(private storageService: StorageService) { }
  orden: any;
  products: any = [];

  ngOnInit(): void {
    const data: any = this.storageService.getCurrentOrder();
    this.orden = JSON.parse(data);
    this.products = this.orden.pedido;
    console.log(this.orden)
  }

}
