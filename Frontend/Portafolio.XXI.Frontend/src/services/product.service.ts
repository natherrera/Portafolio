import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }

    createProduct(product: object) {
        return this.http.post(`api/products/create`, product);
    }
    
    getAllProducts() {
        return this.http.get(`api/products`);
    }

    getProductById(id: number) {
        return this.http.get(`api/products/${id}`);
    }

    deleteProduct(id: number) {
        return this.http.delete(`api/products/delete/${id}`);
    }
}
