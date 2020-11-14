import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public reservaForm: FormGroup;
  nombre: string;
  email: string;
  telefono: string;
  cantidadPersonas: number;
  reserva: any = {};
  public error: {code: number, message: string} = null;

  constructor(private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.reservaForm = this.formBuilder.group({
      email: ['', Validators.required],
      nombre: ['', Validators.required],
      cantidadPersonas: ['', Validators.required],
      telefono: ['', Validators.required],
    })
  }

  public submitReserva()
  {
    if (this.reservaForm.valid)
    {
      this.storageService.setCurrentReserva(this.reservaForm.value);
    }
  }

}
