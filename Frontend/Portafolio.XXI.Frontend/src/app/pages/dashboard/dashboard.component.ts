import { Component, OnInit} from '@angular/core';
import { StorageService } from "../../../services/storage.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit
{
  user: any;
  profile: string;
  currentPage: string;
  ganancias: number = 0;

  constructor (private storageService: StorageService) { }

  ngOnInit(): void //Solo se ejecuta la primera vez que el componente es renderizado
  {
    this.currentPage = 'pedidos';
    this.user = this.storageService.getCurrentUser();
    this.profile = this.user.profile.type;
  }

  obtenerGanancias(){
    
  }
}
