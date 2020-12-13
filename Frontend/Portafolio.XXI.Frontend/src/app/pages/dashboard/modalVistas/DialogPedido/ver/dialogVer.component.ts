import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogVer.component',
  templateUrl: './dialogVer.component.html',
})
export class DialogVerComponent implements OnInit
{
  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<DialogVerComponent>)
  { }

  productos: any = [];
  displayedColumns: string[] = ['nombreProducto', 'cantidad'];

  ngOnInit(): void
  {
    debugger;
    this.productos = this.data.pedido;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
