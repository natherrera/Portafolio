import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogContentPedido.component',
  templateUrl: './dialogContentPedido.component.html',
})
export class DialogContentPedidoComponent implements OnInit
{
  constructor (@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogContentPedidoComponent>)
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
