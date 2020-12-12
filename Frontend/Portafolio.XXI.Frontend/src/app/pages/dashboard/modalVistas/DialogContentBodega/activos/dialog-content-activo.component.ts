import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogContentBodegaComponent } from '../DialogContentBodega.component';

@Component({
  selector: 'app-dialog-content-activo',
  templateUrl: './dialog-content-activo.component.html'
})
export class DialogContentActivoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<DialogContentBodegaComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
