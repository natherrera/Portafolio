import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogContentCocina.component',
  templateUrl: './dialogContentCocina.component.html',
})
export class DialogContentCocinaComponent implements OnInit
{
  constructor (@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogContentCocinaComponent>) { }

  estadoPedido: string;

  ngOnInit(): void
  {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleClickModificar = () => {
    this.data.estadoPreparacion = this.estadoPedido;
    this.dialogRef.close();
  }

}
