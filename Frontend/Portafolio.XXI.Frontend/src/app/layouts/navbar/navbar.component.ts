import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../services/storage.service";
import { User } from "../../../utils/mock-core/models/user.model";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit
{
  public user: User;
  constructor (private storageService: StorageService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void
  {
    this.user = this.storageService.getCurrentUser();
  }

  public logout(): void{
    this.authenticationService.logout().subscribe(
        response => {if(response) {this.storageService.logout();}}
    );
  }

}
