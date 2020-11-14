import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit
{
  currentPage: string;
  constructor () { }

  ngOnInit(): void
  {
    this.currentPage = 'pedidos';
  }



}
