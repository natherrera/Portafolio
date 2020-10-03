import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from "../models/user.model";
import { USERS } from "../../mock-responses/users/usersResponse";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor
{

  constructor () { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    const { url, method, headers, body } = request;

    const usersStorage: any[] = JSON.parse(localStorage.getItem('users')) || [];
    let users = usersStorage.concat(USERS);

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    // .pipe(mergeMap(() =>
    //   {

    //     if (request.url.endsWith('/api/authenticate/login') && request.method === 'POST')
    //     {
    //       let params = request.body;

    //       let found: User = USERS.find((user: User) => { return (params.username === user.username); });
    //       if (found)
    //       {
    //         if (params.password === found.password)
    //         {
    //           return of(new HttpResponse({ status: 200, body: { token: 'fake-token-jwt', user: found } }));
    //         } else
    //         {
    //           return throwError({ code: 2, message: 'La contraseña no cohincide' });
    //         }
    //       } else
    //       {
    //         return throwError({ code: 1, message: 'Usuario no existe' });
    //       }

    //     }

    //     if (request.url.endsWith('/api/authenticate/logout') && request.method === 'POST')
    //     {
    //       return of(new HttpResponse({ status: 200, body: true }));
    //     }

    //     return next.handle(request);

    //   }))

    function handleRoute()
    {
      switch (true)
      {
        case url.endsWith('/api/authenticate/login') && method === 'POST':
          return authenticate();
        case url.endsWith('/api/authenticate/logout') && method === 'POST':
          return logout();
        case url.endsWith('api/users/register') && method === 'POST':
          return register();
        case url.endsWith('api/users') && method === 'GET':
          return getUsers();
        case url.match(/\/api\/users\/delete\/\d+$/) && method === 'DELETE':
          return deleteUser();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function authenticate()
    {
      const { password, email } = body;
      let found = users.find(x => x.email === email && x.password === password);
      if (found)
      {
        if (password === found.password)
        {
          return of(new HttpResponse({ status: 200, body: { token: 'fake-token-jwt', user: {...found, token: 'fake-token-jwt'} } }));
        } else
        {
          return error(1, 'La contraseña no cohincide')
        }
      } else
      {
        return throwError({ code: 1, message: 'Usuario no existe' });
      }
    }

    function logout() {
      return of(new HttpResponse({ status: 200, body: true }));
    }

    function register()
    {
      const { password, email } = body;
      let found = users.find(x => x.email === email && x.password === password);
      if (found)
      {
        return error(3, 'El email ingresado ya se encuentra registrado')
      }

      users.push({...body, profile: {id:1, type:'cliente'}});
      localStorage.setItem('users', JSON.stringify(users));

      return ok();
    }

    function getUsers()
    {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function deleteUser()
    {
      if (!isLoggedIn()) return unauthorized();

      users = users.filter(x => x.id !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    function ok(body?)
    {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(code,message)
    {
      return throwError({ code: {code}, error: { message } });
    }

    function unauthorized()
    {
      return throwError({ status: 401, error: { message: 'Acceso no autorizado' } });
    }

    function isLoggedIn()
    {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl()
    {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
