import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
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
  productos: any = [];
  ganancia: number = 0;
  insumos: any = [];
  ordenes: any = [];
  recetaPedidos: any = [];
  insumosPedidos: any = [];
  fechaVencimiento: string = "";
  cardNumber: string = "";
  codSeguridad: string = "";

  constructor (
    private router: Router, 
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private datePipe: DatePipe,
    private toastr: ToastrService
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
      fechaExpiracion: ['',Validators.required,Validators.min(0)],
      codigoSeguridad: ['', Validators.required],
    })
  }

  ngOnInit(): void
  {
    // console.log(this.orden)
    this.getCurrentDateInApiFormat();
  }

  fechaTarjeta(){
    this.soloNumeros(this.fechaVencimiento);
    if(this.fechaVencimiento.toString().length == 2){
      this.fechaVencimiento = this.fechaVencimiento + "/";
    }
  }

  soloNumeros(cadena)
  {
    console.log(cadena.substring(cadena.length-1));
    console.log(!/^([0-9])*$/.test(cadena.substring(cadena.length-1)));
    if(cadena.length < 3){
      if (!/^([0-9])*$/.test(cadena)){
        this.fechaVencimiento = cadena.substring(0,cadena.length-1);
      }
    }
    else{
      if (!/^([0-9])*$/.test(cadena.substring(cadena.length-1)) && cadena.substring(cadena.length-1) != "/"){
        this.fechaVencimiento = cadena.substring(0,cadena.length-1);
      }
    }
    
      
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
    if(this.fechaVencimiento.length == 5)
    {
      this.pedidos = JSON.parse(this.storageService.getCurrentPedidos());
      this.insumos = JSON.parse(this.storageService.getCurrentInsumo());
      this.productos = JSON.parse(this.storageService.getCurrentProducts());
      this.ganancia = JSON.parse(this.storageService.getCurrentGanancia()) != null && JSON.parse(this.storageService.getCurrentGanancia()) != undefined ? JSON.parse(this.storageService.getCurrentProducts()) : 0;
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
      this.ordenes[this.ordenes.length - 1].pedido.forEach(pedido => {
        this.ganancia = this.ganancia + (pedido.total - (pedido.costo * pedido.cantidad));
      });
      this.storageService.setCurrentInsumo(this.insumos);
      this.storageService.setCurrentGanancia(this.ganancia);
    }
    else{
      this.toastr.error("Datos de pago invalidos!");
    }
    // if (this.pagoForm.valid)
    // {
      
    // }
  }

}
