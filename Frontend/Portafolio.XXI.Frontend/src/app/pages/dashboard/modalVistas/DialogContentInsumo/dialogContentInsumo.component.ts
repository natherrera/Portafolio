import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogContentInsumo.component',
  templateUrl: './dialogContentInsumo.component.html',
})
export class DialogContentInsumoComponent implements OnInit
{
  constructor (@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<DialogContentInsumoComponent>) { }

  costo: number;
  unidadMedida: string;
 
  ngOnInit(): void
  {
    // console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleClickModificar = () => {
    this.data.costo = this.costo;
    this.data.unidadMedida = this.unidadMedida;
    this.dialogRef.close();
  }


}
