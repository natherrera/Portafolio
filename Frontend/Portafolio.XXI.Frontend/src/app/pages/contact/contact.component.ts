import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ContactComponent implements OnInit
{

  public reservaForm: FormGroup;
  nombre: string;
  email: string;
  telefono: string;
  cantidadPersonas: number;
  fecha: string;
  hora: string;
  esTotem: number = 0;
  reserva: any = [];
  minDate: Date;
  maxDate: Date;
  dayMax: string;
  dayMin: string;
  public error: { code: number, message: string } = null;

  constructor (private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router)
  {
    moment.locale('es');
    this.minDate = new Date();
    this.dayMax = moment().add(10, 'days').calendar();
    this.maxDate = new Date(this.dayMax);
  }

  ngOnInit(): void
  {
    this.reservaForm = this.formBuilder.group({
      email: ['', Validators.required],
      nombre: ['', Validators.required],
      cantidadPersonas: ['', Validators.required],
      telefono: ['', Validators.required],
      hora: ['', Validators.required],
      fecha: ['', Validators.required],
    })
  }

  public submitReserva()
  {
    if (this.reservaForm.valid)
    {
      this.reserva = this.reservaForm.value;
      this.reserva.esTotem = this.esTotem;
      this.reserva.fecha = moment(this.fecha).format('L');
      console.log(this.reserva, ': this.reserva')
      this.storageService.setCurrentReserva(this.reservaForm.value);
    }
  }

}
