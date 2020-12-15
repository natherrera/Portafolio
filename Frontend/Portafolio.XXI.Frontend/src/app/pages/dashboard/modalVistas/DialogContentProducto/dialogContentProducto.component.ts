import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogContentProducto.component',
  templateUrl: './dialogContentProducto.component.html',
})
export class DialogContentProductoComponent implements OnInit
{
  constructor (@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogContentProductoComponent>)
  { }



  ngOnInit(): void
  {
    // console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleClickModificar = () => {
    this.dialogRef.close();
  }


}
