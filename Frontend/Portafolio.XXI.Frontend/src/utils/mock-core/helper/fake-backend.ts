import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {User} from "../models/user.model";
import {USERS} from "../../mock-responses/users/usersResponse";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    return of(null).pipe(mergeMap(() => {

      if (request.url.endsWith('/api/authenticate/login') && request.method === 'POST') {
        let params = request.body;

        let found: User = USERS.find((user: User) => {return (params.username === user.username);});
        if (found) {
          if(params.password === found.password) {
            return of(new HttpResponse({status: 200, body: {token: 'fake-token-jwt', user: found}}));
          }else{
            return throwError({code: 2, message: 'The password does not match '});
          }
        } else {
          return throwError({code: 1, message: 'Username does not exists'});
        }

      }

      if (request.url.endsWith('/api/authenticate/logout') && request.method === 'POST') {
        return of(new HttpResponse({status: 200, body: true}));
      }

      return next.handle(request);

    }))

      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
