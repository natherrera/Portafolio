import { Component } from '@angular/core';
import {AuthenticationService} from "../providers/AuthProvider/authentication.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ AuthenticationService ]
})
export class AppComponent
{

}


