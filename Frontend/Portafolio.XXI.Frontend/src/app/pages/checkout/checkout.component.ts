import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import
{
  Router,
} from '@angular/router';
import * as moment from 'moment';

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


  constructor (private router: Router, private formBuilder: FormBuilder,)
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
      this.estadoOrden = true;
      this.orden.estado = "Pagado";
      this.orden = Object.assign(this.orden, this.pagoForm.value);
    }
  }

}
