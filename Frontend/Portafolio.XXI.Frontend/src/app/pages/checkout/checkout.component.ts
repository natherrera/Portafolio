import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { StorageService } from 'src/services/storage.service';
import { PedidoCabecera } from 'src/utils/mock-core/models/pedido.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit
{
  public pagoForm: FormGroup;
  orden: any = {};
  fecha: any;
  formaPago: string;
  estadoOrden: boolean = false;
  public pedido = new PedidoCabecera();
  private currentDate = new Date();
  pedidos: any = [];
  insumos: any = [];
  ordenes: any = [];
  recetaPedidos: any = [];
  insumosPedidos: any = [];


  constructor (
    private router: Router, 
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private datePipe: DatePipe
    )
  {
    const navigation = this.router.getCurrentNavigation();
    const data = navigation.extras;
    this.orden = data;
    moment.locale('es');
    this.fecha = moment().format('LLLL');
    this.pagoForm = this.formBuilder.group({
      formaPago: ['tarjeta', Validators.required],
      nroTarjeta: ['', Validators.required],
      fechaExpiracion: ['', Validators.required],
      codigoSeguridad: ['', Validators.required],
    })
  }

  ngOnInit(): void
  {
    console.log(this.orden)
    this.getCurrentDateInApiFormat();
  }

  getCurrentDateInApiFormat(): string{
    let day:any = this.currentDate.getDate();
    let month:any = this.currentDate.getMonth() + 1;
    let year:any = this.currentDate.getFullYear();
    let dateInApiFormat: string;
    if(day<10){
      day = "0" + day.toString();
    }
    if(month<10){
      month = "0" + month.toString();
    }
    dateInApiFormat = day + "-" + month + "-" + year.toString();
    return dateInApiFormat;
  }
  setEstadoOrden = (forma: string) =>
  {
    this.estadoOrden = true;
    this.formaPago = forma;
  }

  pagar = () =>
  {
    if (this.pagoForm.valid)
    {
      this.pedidos = JSON.parse(this.storageService.getCurrentPedidos());
      this.insumos = JSON.parse(this.storageService.getCurrentInsumo());
      this.estadoOrden = true;
      this.orden.estado = "Pagado";
      this.pedido.mesa = this.orden.mesa;
      this.orden = Object.assign(this.orden, this.pagoForm.value);
      this.orden.fecha = this.datePipe.transform(this.currentDate, "dd-MM-yyyy");
      this.orden.hora = this.datePipe.transform(this.currentDate, "HH:MM");
      this.orden.id =  this.pedidos.length + 1;
      this.storageService.insertPedidos(this.orden);
      this.ordenes = JSON.parse(this.storageService.getCurrentPedidos());
      this.ordenes[this.ordenes.length - 1].pedido.forEach(pedido => {
        this.recetaPedidos.push(pedido.receta);
      });
      this.recetaPedidos.forEach(receta => {
        receta.listaInsumos.forEach(insumoLista => {
          this.insumosPedidos.push(insumoLista);
        });
      });
      this.insumosPedidos.forEach(insumosPedido => {
        this.insumos.forEach(insumo => {
          if(insumo.id == insumosPedido.insumoId){
            insumo.cantidad = insumo.cantidad - insumosPedido.cantidad;
          }
        });
      });
      this.storageService.setCurrentInsumo(this.insumos);
      
    }
  }

}
