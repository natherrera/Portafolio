import { Component, OnInit} from '@angular/core';
import { StorageService } from "../../../services/storage.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit
{
  user: any;
  profile: string;
  currentPage: string;
  ganancias: number = 0;
  pedidos: any = [];
  pedidosListos: number = 0;
  pedidosEnProceso: number = 0;

  constructor (private storageService: StorageService) { }

  ngOnInit(): void //Solo se ejecuta la primera vez que el componente es renderizado
  {
    this.currentPage = 'pedidos';
    this.user = this.storageService.getCurrentUser();
    this.profile = this.user.profile.type;
    this.obtenerData();
  }

  obtenerData(){
    debugger;
    this.ganancias = JSON.parse(this.storageService.getCurrentGanancia()) != null && JSON.parse(this.storageService.getCurrentGanancia()) != undefined ? JSON.parse(this.storageService.getCurrentGanancia()) : 0;
    this.pedidos = JSON.parse(this.storageService.getCurrentPedidos());
    
    this.pedidos.forEach(pedido => {
      if(pedido.estado = "Entregado"){

      }
    });
  }
}
