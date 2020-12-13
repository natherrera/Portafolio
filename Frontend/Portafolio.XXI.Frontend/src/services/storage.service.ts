import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import {Session} from "../utils/mock-core/models/session.model";
import {User} from "../utils/mock-core/models/user.model";

@Injectable()
export class StorageService {

  private localStorageService;
  private currentSession : Session = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  insertProduct(product: any):void {
      console.log("insertProduct");
    // NOTE: DELETE
    product.id = Math.round(Math.random() * 10);
    product.valor = 10000;
    //NOTE: DELETE
    var productList = JSON.parse(localStorage.getItem('products'));
    productList.push(product);
    localStorage.setItem('products', JSON.stringify(productList));
  }
  
  setCurrentProducts(products: any): void {
    this.localStorageService.setItem('products', JSON.stringify(products));
  }

  getCurrentProducts() {
    return this.localStorageService.getItem('products');
  }

  insertInsumo(insumo: any):void {
    var insumoList = JSON.parse(localStorage.getItem('insumo'));
    insumoList.push(insumo);
    localStorage.setItem('insumo', JSON.stringify(insumoList));
  }

  setCurrentInsumo(insumo: any): void {
    this.localStorageService.setItem('insumo', JSON.stringify(insumo));
  }

  getCurrentInsumo() {
    return this.localStorageService.getItem('insumo');
  }

  setCurrentTipoInsumo(tipoInsumo: any): void {
    this.localStorageService.setItem('tipoInsumo', JSON.stringify(tipoInsumo));
  }

  getCurrentTipoInsumo() {
    return this.localStorageService.getItem('tipoInsumo');
  }

  insertTrabajador(trabajador: any):void {
  var trabajadorList = JSON.parse(localStorage.getItem('trabajador'));
  trabajadorList.push(trabajador);
  localStorage.setItem('trabajador', JSON.stringify(trabajadorList));
  }

  setCurrentTrabajador(trabajador: any): void {
    this.localStorageService.setItem('trabajador', JSON.stringify(trabajador));
  }

  getCurrentTrabajador() {
    return this.localStorageService.getItem('trabajador');
  }

  insertProveedor(proveedor: any):void {
    var proveedorList = JSON.parse(localStorage.getItem('proveedor'));
    proveedorList.push(proveedor);
    localStorage.setItem('proveedor', JSON.stringify(proveedorList));
  }

  setCurrentProveedor(proveedor: any): void {
    this.localStorageService.setItem('proveedor', JSON.stringify(proveedor));
  }

  getCurrentProveedor() {
    return this.localStorageService.getItem('proveedor');
  }

  setCurrentAttention(orderTable: any): void {
    this.localStorageService.setItem('solicitudAtencion', JSON.stringify(orderTable));
  }

  getCurrentAttention(): void {
    return this.localStorageService.getItem('solicitudAtencion');
  }

  setCurrentReserva(reserva: any): void {
    this.localStorageService.setItem('reserva', JSON.stringify(reserva));
  }

  getCurrentReserva(): void {
    return this.localStorageService.getItem('reserva');
  }

  setCurrentOrder(order: any): void {
    this.localStorageService.setItem('order', JSON.stringify(order));
  }

  getCurrentOrder(): void {
    return this.localStorageService.getItem('order');
  }

  loadSessionData(): Session{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): User {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

}
