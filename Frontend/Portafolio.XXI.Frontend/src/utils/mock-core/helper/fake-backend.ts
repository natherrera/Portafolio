import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { USERS } from "../../mock-responses/users/usersResponse";
import { orders } from "../../mock-responses/orders/ordersResponse";
import { products } from "../../mock-responses/producto/productsResponse";
import { insumos } from "../../mock-responses/insumo/insumoResponse";

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

    function handleRoute()
    {
      console.log("handleRoute");
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

        case url.endsWith('api/orders') && method === 'GET':
          return getOrders();
        case url.match(/\/api\/orders\/\d+$/) && method === 'GET':
          return getOrderById();
        case url.endsWith('api/orders/create') && method === 'POST':
          return createOrder();
        case url.match(/\/api\/orders\/delete\/\d+$/) && method === 'DELETE':
          return deleteOrder();

        case url.endsWith('api/products') && method === 'GET':
          return getProducts();
        case url.match(/\/api\/products\/\d+$/) && method === 'GET':
            return getProductsById();
        case url.endsWith('api/products/create') && method === 'POST':
          return createProduct();
        case url.match(/\/api\/products\/delete\/\d+$/) && method === 'DELETE':
          return deleteProduct();

        case url.endsWith('api/insumos') && method === 'GET':
          console.log("getInsumos");
          return getInsumos();
        // case url.match(/\/api\/INSUMO_DATA\/\d+$/) && method === 'GET':
        //   return getInsumosById();
        case url.endsWith('api/insumos/create') && method === 'POST':
          return createInsumos();
        case url.match(/\/api\/insumos\/delete\/\d+$/) && method === 'DELETE':
          // return deleteInsumo();

        default:
          return next.handle(request);
      }
    }

    // AUTENTICACION
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



    // ORDENES

    function getOrders()
    {
      return ok(orders);
    }

    function getOrderById()
    {
      const order = orders.filter(x => x.id === idFromUrl());
      return ok(order);
    }

    function createOrder()
    {
      const { id } = body;
      let found = orders.find(x => x.id === id);
      if (found)
      {
        return error(3, 'La orden ingresada ya se encuentra registrado')
      }

      orders.push({...body});
      localStorage.setItem('orders', JSON.stringify(orders));

      return ok();
    }

    function deleteOrder()
    {
      const filteredOrders = orders.filter(x => x.id !== idFromUrl());
      localStorage.setItem('orders', JSON.stringify(filteredOrders));
      return ok();
    }

    // USUARIO
    function getUsers()
    {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
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

    function deleteUser()
    {
      if (!isLoggedIn()) return unauthorized();

      users = users.filter(x => x.id !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    // PRODUCTO
    function getProducts()
    {
      return ok(products);
    }

    function createProduct()
    {
      const { id } = body;
      let found = products.find(x => x.id === id);
      if (found)
      {
        return error(3, 'El producto ingresado ya se encuentra registrado');
      }

      products.push({...body});
      localStorage.setItem('products', JSON.stringify(products));

      return ok();
    }

    function getProductsById()
    {
      const product = products.filter(x => x.id === idFromUrl());
      return ok(product);
    }

    function deleteProduct()
    {
      const filteredProducts = products.filter(x => x.id !== idFromUrl());
      localStorage.setItem('products', JSON.stringify(filteredProducts));
      return ok();
    }

    

    // Insumo
    function getInsumos()
    {
      return ok(insumos);
    }

    function createInsumos()
    {
      const { id } = body;
      let found = insumos.find(x => x.id === id);
      if (found)
      {
        return error(3, 'El insumo ingresado ya se encuentra registrado');
      }

      insumos.push({...body});
      localStorage.setItem('insumos', JSON.stringify(insumos));

      return ok();
    }

    // function getInsumosById()
    // {
    //   const insumo = INSUMO_DATA.filter(x => x.id === idFromUrl());
    //   return ok(insumo);
    // }

    // function deleteInsumo()
    // {
    //   const filteredInsumos = INSUMO_DATA.filter(x => x.id !== idFromUrl());
    //   localStorage.setItem('INSUMO_DATA', JSON.stringify(filteredInsumos));
    //   return ok();
    // }

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
