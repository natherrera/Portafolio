import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogContentProveedor.component',
  templateUrl: './dialogContentProveedor.component.html',
})
export class DialogContentProveedorComponent implements OnInit
{
  constructor (@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogContentProveedorComponent>){ }

  tipoProveedor: string;

  ngOnInit(): void
  {
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleClickModificar = () => {
    this.tipoProveedor = this.tipoProveedor;
    this.dialogRef.close();
  }


}
