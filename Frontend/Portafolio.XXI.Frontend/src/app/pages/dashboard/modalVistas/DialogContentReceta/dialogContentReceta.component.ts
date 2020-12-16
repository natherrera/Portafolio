import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

// @Component({
//   selector: 'app-dialogContentReceta.component',
//   templateUrl: './dialogContentReceta.component.html',
// })
// export class DialogContentRecetaComponent implements OnInit
// {
//   constructor (@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogContentRecetaComponent>)
//   { }

//   nombreInsumo: string;
//   cantidad: string;
//   unidadMedida: string;

//   ngOnInit(): void
//   {
//     console.log(this.data)
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   handleClickModificar = () => {
//     this.data.nombreInsumo = this.nombreInsumo;
//     this.data.cantidad = this.cantidad;
//     this.data.unidadMedida = this.unidadMedida;
//     this.dialogRef.close();
//   }


// }