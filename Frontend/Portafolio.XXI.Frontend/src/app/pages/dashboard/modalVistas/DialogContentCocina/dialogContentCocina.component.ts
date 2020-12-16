import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-dialogContentCocina.component',
  templateUrl: './dialogContentCocina.component.html',
})
export class DialogContentCocinaComponent implements OnInit
{
  listaPedidos: any [];
  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<DialogContentCocinaComponent>,
    private storageService: StorageService
    ) { }

  estadoPedido: string;

  ngOnInit(): void
  {
    this.listaPedidos = JSON.parse(this.storageService.getCurrentPedidos());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleClickModificar = () => {
    debugger;
    this.listaPedidos.forEach(element => {
      if(element.id == this.data.id){
        element.estado = this.estadoPedido;
      }
    });
    this.storageService.setCurrentPedidos(this.listaPedidos);
    location.reload();
  }

}
