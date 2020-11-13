import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogVer.component',
  templateUrl: './dialogVer.component.html',
})
export class DialogVerComponent implements OnInit
{
  constructor (@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogVerComponent>)
  { }

  productos: any = [];
  displayedColumns: string[] = ['nombreProducto', 'tipo', 'cantidad', 'total'];

  ngOnInit(): void
  {
    this.data.bebestibles.map((e) => e.tipo = "bebestibles" );
    this.data.comestibles.map((e) => e.tipo = "comestibles" );
    this.productos = this.data.bebestibles.concat(this.data.comestibles);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
