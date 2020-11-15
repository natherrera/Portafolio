import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cancelar',
  templateUrl: './cancelarreserva.component.html',

})
export class CancelarreservaComponent implements OnInit
{
  reserva: any = [];
  estadoProceso: boolean = false;
  estadoOrden: string;
  public cancelarForm: FormGroup;

  constructor (private storageService: StorageService,
    private router: Router, private formBuilder: FormBuilder)
  {}

  ngOnInit(): void
  {
    this.cancelarForm = this.formBuilder.group({
      email: ['', Validators.required]
    })
  }

  public cancelar()
  {
    if (this.cancelarForm.valid)
    {
      this.estadoProceso = true;
      this.estadoOrden = "Cancelado";
    }
  }

}
