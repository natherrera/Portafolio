import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogContentMesa.component',
  templateUrl: './dialogContentMesa.component.html',
})
export class DialogContentMesaComponent implements OnInit
{
  constructor (@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DialogContentMesaComponent>) { }

  disponibilidad: string;

  ngOnInit(): void
  {
    console.log(this.data)
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  handleClickModificar = () => {
    this.data.estado = this.disponibilidad;
    this.dialogRef.close();
  }


}
