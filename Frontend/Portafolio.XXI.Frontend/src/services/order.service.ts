import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {
    constructor(private http: HttpClient) { }

    getAllProducts() {
        return this.http.get(`api/orders`);
    }

    register(product: object) {
        return this.http.post(`api/orders/create`, product);
    }

    getOrderById(id: number) {
        return this.http.delete(`api/orders/${id}`);
    }

    delete(id: number) {
        return this.http.delete(`api/orders/delete/${id}`);
    }
}
