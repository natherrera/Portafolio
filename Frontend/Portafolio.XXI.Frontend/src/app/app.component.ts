import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthenticationService } from "../providers/AuthProvider/authentication.service";
import { filter } from 'rxjs/operators';
import './../assets/smtp.js';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
        AuthenticationService,
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent implements OnInit
{
    location: any;
    routerSubscription: any;

    constructor (private router: Router)
    {
    }

    ngOnInit()
    {
        this.recallJsFuntions();
    }

    recallJsFuntions()
    {
        this.router.events
            .subscribe((event) =>
            {
                if (event instanceof NavigationStart)
                {
                    $('#preloaders').fadeIn('slow');
                }
            });
        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
            .subscribe(event =>
            {
                $.getScript('assets/js/quickmunch.js');
                $('#preloader').fadeOut('slow');
                this.location = this.router.url;
                if (!(event instanceof NavigationEnd))
                {
                    return;
                }
                window.scrollTo(0, 0);
            });
    }
}


