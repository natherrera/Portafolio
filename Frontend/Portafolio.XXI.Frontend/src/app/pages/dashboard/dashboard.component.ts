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
  profile: any;
  currentPage: string;
  constructor (private storageService: StorageService) { }

  ngOnInit(): void
  {
    this.currentPage = 'pedidos';
    this.user = this.storageService.getCurrentUser();
    this.profile = this.user.profile.type;
  }



}
