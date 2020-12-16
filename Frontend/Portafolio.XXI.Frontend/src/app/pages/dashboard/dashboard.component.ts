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
  reservas: any = [];
  pedidosListos: number = 0;
  pedidosEnProceso: number = 0;
  ventas: number = 0;
  costo: number = 0;
  totalPedido: number = 0;
  pendiente: number = 0;
  entregados: number = 0;
  totalReservas: number = 0;

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
    this.reservas = JSON.parse(this.storageService.getCurrentReserva());
    this.totalReservas = this.reservas != null && this.reservas != undefined ? this.reservas.length : 0;
    this.totalPedido = this.pedidos.length;
    this.pedidos.forEach(pedido => {
      pedido.pedido.forEach(item => {
        this.costo = this.costo + (item.costo * item.cantidad);
      });
      this.ventas = this.ventas + pedido.subtotal;
      if(pedido.estado != "Entregado"){
        this.pendiente ++;
      }
      else{
        this.entregados ++;
      }
    });
  }
}
