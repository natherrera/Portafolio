import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogModificar.component',
  templateUrl: './dialogModificar.component.html',
})
export class DialogModificarComponent implements OnInit
{
  constructor (@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogModificarComponent>)
  { }

  tipoPago: string = this.data.tipoPago;
  estado: string = this.data.estado;

  ngOnInit(): void
  {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleClickModificar = () => {
    this.data.tipoPago = this.tipoPago;
    this.data.estado = this.estado;
    this.dialogRef.close();
  }


}
