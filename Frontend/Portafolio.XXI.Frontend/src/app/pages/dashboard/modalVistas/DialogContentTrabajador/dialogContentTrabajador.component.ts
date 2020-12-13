import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogContentTrabajador.component',
  templateUrl: './dialogContentTrabajador.component.html',
})
export class DialogContentTrabajadorComponent implements OnInit
{
  constructor (@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogContentTrabajadorComponent>)
  { }

  nombre: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  fechaNacimiento: string;
  sexo: string;
  // usuario: string;
  // email: string;

  ngOnInit(): void
  {
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleClickModificar = () => {
    this.data.nombre = this.nombre;
    this.data.apellidoMaterno = this.apellidoMaterno;
    this.data.apellidoPaterno = this.apellidoPaterno;
    this.data.fechaNacimiento = this.fechaNacimiento;
    this.data.sexo = this.sexo;
    // this.data.usuario = this.usuario;
    // this.data.email = this.email;
    this.dialogRef.close();
  }


}
